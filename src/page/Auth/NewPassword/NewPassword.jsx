import changePasswordImage from "/public/Auth/update-password.png";
import authLogo from "../../../assets/auth/auth-logo.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { Form } from "antd"; // Import Ant Design Form
import CustomInput from "../../../utils/CustomInput";
import CustomButton from "../../../utils/CustomButton";
import { toast } from "sonner";
import { useResetPasswordMutation } from "../../../redux/features/auth/authApi";

import logoimage from '/public/logo/Logo-Orange.png';

const NewPassword = () => {
  const navigate = useNavigate();
  const { email } = useParams();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const jwtToken = localStorage.getItem("jwtToken");

  console.log(jwtToken);

  const submit = async (values) => {
    const { password, confirmPassword } = values;


    if (!password || !confirmPassword) {
      toast.error("Password is required");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }


    try {
      const res = await resetPassword({
        email: email,
        password: password
      });
      console.log(res);
      if (res.error) {
        toast.error(res.error.data.message);
      }
      if (res.data) {
        toast.success(res.data.message);
        navigate("/auth/login");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="w-full bg-[#fefaf4] h-full md:h-screen md:flex justify-around ">
      <div className=" h-[70%] md:w-[600px] w-[70%] mx-auto my-20 border-2 border-[#b5b5b5] rounded-xl md:my-28 place-content-center px-5 py-10 gap-8 bg-[#fefaf4] md:mx-10">

        <div className="">
          <div className="mb-5">
            <img src={logoimage} className="w-[100px] mx-auto mb-5" alt="" />

            <h1 className="font-semibold text-xl flex items-center gap-2">
              <Link to="/auth/login">
                <IoIosArrowBack />
              </Link>
              Update Password
            </h1>
          </div>

          {/* Ant Design Form */}
          <Form
            layout="vertical"
            onFinish={submit} // Ant Design's form submission handler
            initialValues={{ password: "", confirmPassword: "" }} // Initial values
          >
            {/* CustomInput wrapped inside Form.Item for validation */}
            <Form.Item
              label="New Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your new password",
                },
              ]}
            >
              <CustomInput isPassword type="password" placeholder="Password" />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Please confirm your password",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match!"));
                  },
                }),
              ]}
            >
              <CustomInput
                isPassword
                type="password"
                placeholder="Confirm Password"
              />
            </Form.Item>

            {/* CustomButton for submission */}
            <Form.Item>
              <button className="w-full bg-[#344f47] text-xl font-semibold text-white rounded-md py-2" loading={isLoading} border >
                Update Password
              </button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
