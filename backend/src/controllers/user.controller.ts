import { Request, Response } from "express"
import User from "../models/user.model";
import asyncHandler from "express-async-handler";
import { UpdateUserRequest } from "@shared/auth.types";
import { NotFoundError } from "../errors/NotFoundError";
import { OtherError } from "../errors/OtherError";
import { clerkClient, getAuth } from "@clerk/express";
import Notification from "../models/notification.model"

export const getUserProfile = asyncHandler(async (req: Request, res: Response) => {

    const { username } = req.params;
    const user = await User.findOne({ username })

    if (!user) {
        throw new NotFoundError("User not found");
    }
    res.status(200).json({ user })

})

export const updateProfile = asyncHandler(async (req: Request<{}, {}, UpdateUserRequest>, res: Response) => {


    const { userId } = getAuth(req);
    const user = await User.findOneAndUpdate({ clerkId: userId }, req.body, { new: true });
    if (!user) {
        throw new NotFoundError("User not found");
    }
    res.status(200).json({ user });
})

export const syncUser = asyncHandler(async (req: Request, res: Response) => {

    const { userId } = getAuth(req);
    const esistingUser = await User.findOne({ clerkId: userId });

    if (esistingUser) {
        res.status(200).json({ user: esistingUser, message: "User already exists" });
    }
    if (!userId) {
        throw new NotFoundError("User ID not found in request");
    }
    const clerkUser = await clerkClient.users.getUser(userId);
    const userData = {
        clerkId: userId,
        email: clerkUser.emailAddresses[0].emailAddress,
        firstName: clerkUser.firstName || "",
        lastName: clerkUser.lastName || "",
        username: clerkUser.emailAddresses[0].emailAddress.split("@")[0],
        profilePicture: clerkUser.imageUrl || "",
    };

    const user = await User.create(userData);

    res.status(201).json({ user, message: "User created successfully" });
})

export const getCurrentUser = asyncHandler(async (req, res) => {
    const { userId } = getAuth(req);
    const user = await User.findOne({ clerkId: userId });

    if (!user) {
        throw new NotFoundError("User not found");
    }

    res.status(200).json({ user });
});

export const followUser = asyncHandler(async (req: Request, res: Response) => {

    const { userId } = getAuth(req);
    const { targetUserId } = req.params;

    if (userId === targetUserId) {
        throw new OtherError("You cannot follow yourself");
    }

    const currentUser = await User.findOne({ clerkId: userId });
    const targetUser = await User.findById(targetUserId);

    if (!currentUser || !targetUser) {
        throw new NotFoundError("User not found");
    }

    const mongoose = require("mongoose");
    const isFollowing = currentUser.following.includes(mongoose.Types.ObjectId(targetUserId));

    if (isFollowing) {
        //unfollow
        await User.findByIdAndUpdate(currentUser._id, {
            $pull: { following: targetUser._id }
        })
        await User.findByIdAndUpdate(targetUser._id, {
            $pull: { followers: currentUser._id }
        })
    } else {
        //follow
        await User.findByIdAndUpdate(currentUser._id, {
            $push: { following: targetUser._id }
        })
        await User.findByIdAndUpdate(targetUser._id, {
            $push: { followers: currentUser._id }
        })
    }
    //create notification
    await Notification.create({
        from: currentUser._id,
        to: targetUser._id,
        type: "follow"
    })

    res.status(200).json({ message: isFollowing ? "User unfollowed successfully" : "User followed successfully" });
})