import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import SpandoIT from "./SpandoIT";
import { Link } from "react-router-dom";
import axios from "../../utils/axiosInstance.js";
import ErrorDisp from "./ErrorDisp";
import ShowLoading from "./ShowLoading";

const splPresent = (char) => {
  return (
    !digitPresent(char) &&
    !upperPresent(char) &&
    !lowerPresent(char) &&
    char !== " "
  );
};
const lowerPresent = (char) => {
  return char >= "a" && char <= "z";
};
const upperPresent = (char) => {
  return char >= "A" && char <= "Z";
};
const digitPresent = (char) => {
  return char >= "0" && char <= "9";
};

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // console.log(password);
  const updateStrength = () => {
    if (password.length < 8) {
      if (password.length == 0) setStrength(-1);
      else setStrength(0);
    } else {
      let hasDigit = false,
        hasSpecialChar = false,
        hasLower = false,
        hasUpper = false;
      for (const char of password) {
        if (!hasDigit && digitPresent(char)) hasDigit = true;
        if (!hasLower && lowerPresent(char)) hasLower = true;
        if (!hasUpper && upperPresent(char)) hasUpper = true;
        if (!hasSpecialChar && splPresent(char)) hasSpecialChar = true;
      }
      let strengthScore = hasDigit + hasSpecialChar + hasLower + hasUpper;

      if (strengthScore <= 3) {
        setStrength(1);
      } else {
        setStrength(2);
      }
    }

    return new Promise((resolve, reject) => {
      resolve(400);
    })
  };

  const validateUsername = () => {
    if (
      username &&
      username.length >= 5 &&
      !username.includes(" ") &&
      !/^[0-9]/.test(username) &&
      !/^[^0-9a-zA-Z]/.test(username)
    ) {
      return true;
    } else {
      setErrorMsg(
        "Username must be atleast 5 characters, must not start with non-alphabetic characters and must not contain spaces."
      );
      return false;
    }
  };

  const validatePassword = () => {
    if (!password) {
      setErrorMsg("You need to enter a password");
      return false;
    } else if (strength == 2) return true;
    else {
      setErrorMsg(
        strength == -1
          ? "Please enter Password "
          : strength <= 1
            ? "Weak Password! Password must contain atlease one lowercase, one uppercase, one number and a special character"
            : ""
      );
      return false;
    }
  };
  const registerUser = async (e) => {
    e.preventDefault();
    const registerInfo = async () => {
      if (validateUsername() && validatePassword()) {
        try {
          const res = await axios.post("/api/auth/register", {
            username,
            password,
          });
          setErrorMsg(res.data.message);
        } catch (err) {
          if (err.message === "Request failed with status code 500")
            setErrorMsg("Server Failed to Connect");
          else setErrorMsg(err.response.data.message);
        }
      }
      setTimeout(() => {
        setLoading(false);
        setErrorMsg("");
      }, 2000);
    };

    registerInfo();
  };

  useEffect(() => {
    updateStrength();
  },[password]);
  return (
    <section className="m-auto w-9/10 lg:w-1/3 bg-gray-800/70 p-3 rounded-md subtle-shadow flex-center flex-col">
      <h1 className="text-center text-2xl sm:text-4xl rubik-font text-aqua-blue">
        Join the <SpandoIT /> Squad
      </h1>

      <p className="text-text2 text-center text-sm sm:text-base mt-2 mb-4 italic">
        Be the boss of your tasks — start your productivity journey now.
      </p>

      <form className="authForm flex flex-col gap-5 p-5 w-4/5 ">
        <div>
          <FaUser />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value.trim())}
            placeholder="Create a Username : "
          />
        </div>
        <div>
          <MdPassword />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Set your password : "
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <p className="flex-center gap-2 cursor-pointer" onClick={() => {
          setShowPassword(prev => !prev);
        }}>
          {showPassword ? "Hide password ? " : "Show Password ? "}
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </p>
        <h2 className="text-center">
          Already part of Squad ?{" "}
          <Link to={"/login"} className="text-green-500">
            Start doIT
          </Link>
        </h2>

        <input
          type="submit"
          className="w-3/5 border-1 cursor-pointer m-auto rounded-md
     bg-spark-yellow transition-[all_1.5s_ease-in-out] active:shadow-[-1px_3px_10px_2px_#FFB200]  hover:scale-105 
        active:scale-95 shadow-[-1px_2px_7px_0px_grey]
                "
          value="Register"
          onClick={(e) => {
            setLoading(!loading);
            registerUser(e);
          }}
        />
      </form>

      {!errorMsg && loading && (
       <ShowLoading/>
      )}

      {errorMsg && <ErrorDisp msg={errorMsg} />}
    </section>
  );
}
