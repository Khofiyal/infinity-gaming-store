import CommonForm from "@/components/common/form";
import ShoppingHeader from "@/components/shopping-view/header";
import { useToast } from "@/components/ui/use-toast";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  return (
    // <div className="mx-auto w-full max-w-md space-y-6">
    //   <div className="text-center">
    //     <h1 className="text-3xl font-bold tracking-tight text-foreground">
    //       Sign in to your account
    //     </h1>
        // <p className="mt-2">
        //   Don't have an account
        //   <Link
        //     className="font-medium ml-2 text-primary hover:underline"
        //     to="/auth/register"
        //   >
        //     Register
        //   </Link>
        // </p>
    //   </div>
    //   <CommonForm
    //     formControls={loginFormControls}
    //     buttonText={"Sign In"}
    //     formData={formData}
    //     setFormData={setFormData}
    //     onSubmit={onSubmit}
    //   />
    // </div>

    <div className="mx-auto w-full max-w-md space-y-6">
			<motion.div
				className='sm:mx-auto sm:w-full sm:max-w-md'
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
			>
				<h2 className='mt-6 text-center text-3xl font-extrabold text-purple-400'>Login to your account</h2>
        <p className="mt-2 text-center">
          Don't have an account?
          <Link
            className="font-medium ml-2 text-purple-500 hover:underline "
            to="/auth/register"
          >
            Register
          </Link>
        </p>
			</motion.div>
      <motion.div
				className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.2 }}
			>
        <div className='bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10'>
        <CommonForm
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
        </div>
      </motion.div>
		</div>

  );
}

export default AuthLogin;
