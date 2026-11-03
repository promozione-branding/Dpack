import { connectDB } from "@/lib/db/mongoose";
import User from "@/lib/models/User";
import { requireAuth, ok, err } from "@/lib/apiHelpers";

const ADDRESS_FIELDS = [
  "line1",
  "line2",
  "companyName",
  "gstNo",
  "city",
  "state",
  "pincode",
  "country",
];

function updateAddress(existingAddress, incomingAddress) {
  const updated = {
    ...(existingAddress?.toObject?.() || existingAddress || {}),
  };

  for (const field of ADDRESS_FIELDS) {
    if (incomingAddress[field] !== undefined) {
      updated[field] =
        field === "gstNo"
          ? incomingAddress[field].trim().toUpperCase()
          : incomingAddress[field].trim();
    }
  }

  return updated;
}

export async function PUT(request) {
  const { user: authUser, error } = await requireAuth(request);
  if (error) return error;

  try {
    const body = await request.json();

    const {
      name,
      email,
      address,
      billingAddress,
      gstNumber,
    } = body;

    await connectDB();

    const user = await User.findById(authUser._id);

    if (!user) {
      return err("User not found", 404);
    }

    if (name !== undefined) {
      user.name = name.trim();
    }

    if (email !== undefined) {
      user.email = email.trim().toLowerCase();
    }

    if (address !== undefined) {
      if (
        !address ||
        typeof address !== "object" ||
        Array.isArray(address)
      ) {
        return err("Invalid shipping address", 400);
      }

      for (const field of ADDRESS_FIELDS) {
        if (
          address[field] !== undefined &&
          typeof address[field] !== "string"
        ) {
          return err(`Invalid address field: ${field}`, 400);
        }
      }

      user.address = updateAddress(user.address, address);
    }

    if (billingAddress !== undefined) {
      if (
        !billingAddress ||
        typeof billingAddress !== "object" ||
        Array.isArray(billingAddress)
      ) {
        return err("Invalid billing address", 400);
      }

      for (const field of ADDRESS_FIELDS) {
        if (
          billingAddress[field] !== undefined &&
          typeof billingAddress[field] !== "string"
        ) {
          return err(`Invalid billing address field: ${field}`, 400);
        }
      }

      user.billingAddress = updateAddress(
        user.billingAddress,
        billingAddress
      );
    }

    if (gstNumber !== undefined) {
      user.gstNumber = gstNumber.trim().toUpperCase();
    }

    await user.save();

    return ok({
      message: "Profile updated successfully",
      user: {
        id: user._id,
        mobile: user.mobile,
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address,
        billingAddress: user.billingAddress,
        gstNumber: user.gstNumber,
      },
    });
  } catch (error) {
    console.error("Update profile error:", error);

    if (error.name === "ValidationError") {
      return err(error.message, 400);
    }

    return err("Failed to update profile", 500);
  }
}