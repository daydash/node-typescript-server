import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	userName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	authentication: {
		password: {
			type: String,
			required: true,
			select: false,
		},
		salt: {
			type: String,
			select: false,
		},
		sessionToken: {
			type: String,
			select: false,
		},
	},
});

export const UserModel = mongoose.model("User", UserSchema);

export const getUsers = async () => await UserModel.find();
export const getUserByEmail = async (email: string) =>
	await UserModel.findOne({ email });
export const getUserBySessionToken = async (sessionToken: string) =>
	await UserModel.findOne({ "authentication.sessionToken": sessionToken });
export const getUserById = async (id: string) =>
	await UserModel.findOne({ id });
export const createUser = async (values: Record<string, any>) =>
	new UserModel(values).save().then((user) => user.toObject());
export const deleteUserById = async (id: string) =>
	await UserModel.findOneAndDelete({ id });
export const updateUserById = async (id: string, values: Record<string, any>) =>
	await UserModel.findByIdAndUpdate(id, values);
