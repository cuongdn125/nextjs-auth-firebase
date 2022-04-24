import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import {
  Box,
  Button,
  Center,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "../config/firebase";
import { loginEmail, loginFacebook, loginGoogle } from "../hooks/auth";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("84");
  const [openOTP, setOpenOTP] = useState(false);
  const [pinCode, setPinCode] = useState("");

  const [confirmObj, setConfirmObj] = useState(null);

  const handleLoginEmail = () => {
    loginEmail(email, password, router);
  };
  const handleSignUpPhone = () => {
    if (phone === "" || phone.length < 10) return;
    loginWithPhone();
  };

  const handlePinCode = (value: string) => {
    setPinCode(value);
  };
  const handleComplete = (value: string) => {
    try {
      confirmObj
        .confirm(value)
        .then((userCredential) => {
          console.log(userCredential);
          const user: any = userCredential.user;
          localStorage.setItem("accessToken", user.accessToken);
          router.push("/");
        })
        .catch((error) => {
          if (error.code === "auth/invalid-verification-code") {
            alert("Invalid OTP");
            window.location.reload();
          }
        });
    } catch (err) {
      console.log({ err });
    }
  };

  const loginWithPhone = () => {
    try {
      const appVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {},
        auth
      );
      const phoneNumber = "+" + phone;
      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          console.log(confirmationResult);
          setConfirmObj(confirmationResult);
          setOpenOTP(true);
        })
        .catch((error) => {
          console.error({ error });
        });
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    document.title = "Login";
  }, []);

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Tabs isFitted variant="enclosed">
            <TabList mb="1em">
              <Tab>Email</Tab>
              <Tab>Phone</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Stack spacing={4}>
                  <FormControl id="email">
                    <FormLabel>Email address</FormLabel>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </FormControl>
                  <FormControl id="password">
                    <FormLabel>Password</FormLabel>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </FormControl>
                  <Stack spacing={10}>
                    <Stack
                      direction={{ base: "column", sm: "row" }}
                      align={"start"}
                      justify={"space-between"}
                    >
                      <Checkbox>Remember me</Checkbox>
                      <Box
                        _hover={{
                          cursor: "pointer",
                          color: "blue.500",
                          textDecoration: "underline",
                        }}
                        color={"blue.400"}
                      >
                        <Link href="/signup" passHref>
                          <a>Sign up</a>
                        </Link>
                      </Box>
                    </Stack>
                    <Button
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                      onClick={handleLoginEmail}
                    >
                      Sign in
                    </Button>
                  </Stack>
                  <Button
                    w={"full"}
                    variant={"outline"}
                    leftIcon={<FcGoogle />}
                    onClick={() => {
                      loginGoogle(router);
                    }}
                  >
                    <Center>
                      <Text>Sign in with Google</Text>
                    </Center>
                  </Button>
                  <Button
                    w={"full"}
                    colorScheme={"facebook"}
                    leftIcon={<FaFacebook />}
                    onClick={() => {
                      loginFacebook(router);
                    }}
                  >
                    <Center>
                      <Text>Login with Facebook</Text>
                    </Center>
                  </Button>
                </Stack>
              </TabPanel>
              <TabPanel>
                <Stack spacing={4}>
                  <Box
                    textAlign={"center"}
                    display={openOTP ? "block" : "none"}
                  >
                    <PinInput
                      type="number"
                      value={pinCode}
                      onChange={handlePinCode}
                      onComplete={handleComplete}
                    >
                      <PinInputField textAlign={"center"} />
                      <PinInputField textAlign={"center"} mr={2} />
                      <PinInputField textAlign={"center"} mr={2} />
                      <PinInputField textAlign={"center"} mr={2} />
                      <PinInputField textAlign={"center"} mr={2} />
                    </PinInput>
                  </Box>
                  <Stack spacing={4} display={openOTP ? "none" : "block"}>
                    <Center color="gray.500" mb={4}>
                      What is your phone number ?
                    </Center>
                    <PhoneInput
                      placeholder="Enter phone number"
                      value={phone}
                      specialLabel={""}
                      country={"th"}
                      onChange={(e) => {
                        setPhone(e);
                      }}
                    />
                    <Box id="recaptcha-container"></Box>
                    <Button
                      w={"full"}
                      colorScheme="teal"
                      variant="solid"
                      onClick={handleSignUpPhone}
                    >
                      SEND OTP
                    </Button>
                  </Stack>
                </Stack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Stack>
    </Flex>
  );
}
