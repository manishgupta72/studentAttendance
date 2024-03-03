const { z } = require("zod");

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be at least of 3 characters" })
    .max(255, { message: "Email must not be more than 255 characters" }),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(3, { message: "password min 3 character" })
    .max(255, { message: "password max be 255 character" }),
});

const signupSchema = loginSchema.extend({
  username: z
    .string({ required_error: "Username is required" })
    .trim()
    .min(3, { message: "username minimum character is 3" })
    .max(255, { message: "username must not be more than 255 character" }),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(3, { message: "password minimum character is 3" })
    .max(255, { message: "password must not be more than 255 character" }),
  card: z.string({ required_error: "card number is required" }).trim(),
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "name minimum character is 3" })
    .max(255, { message: "name must not be more than 255 character" }),
  course: z
    .string({ required_error: "Course is required" })
    .trim()
    .min(3, { message: "Course minimum character is 3" })
    .max(255, { message: "Course must not be more than 255 character" }),
  classes: z
    .string({ required_error: "Classes is required" })
    .trim()
    .min(3, { message: "Classes minimum character is 3" })
    .max(255, { message: "Classes must not be more than 255 character" }),
  rollno: z
    .string({ required_error: "RollNo is required" })
    .trim()
    .min(3, { message: "RollNo minimum character is 3" })
    .max(255, { message: "RollNo must not be more than 255 character" }),
  address: z
    .string({ required_error: "address is required" })
    .trim()
    .min(3, { message: "address minimum character is 3" })
    .max(255, { message: "address must not be more than 255 character" }),
  dob: z.string({ required_error: "DOB is required" }).trim(),
  blood: z.string({ required_error: "Blood is required" }).trim(),
  year: z.string({ required_error: "year is required" }).trim(),
  gender: z.string({ required_error: "gender is required" }).trim(),
  image: z.string({ required_error: "image is required" }).trim(),

  phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .min(10, { message: "phone must be 10 character" })
    .max(10, { message: "phone must be 10 character" }),
});
module.exports = { signupSchema, loginSchema };
