import { AddIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FiHome } from "react-icons/fi";
import { GiJewelCrown } from "react-icons/gi";
import { IoIosMan, IoIosWoman } from "react-icons/io";
import { SiElectron } from "react-icons/si";
import { logout } from "../../hooks/auth";

const LinkItems = [
  { name: "Home", icon: FiHome, href: "/" },
  { name: "Electronics", icon: SiElectron, href: "/category/electronics" },
  { name: "Jewelery", icon: GiJewelCrown, href: "/category/jewelery" },
  { name: "Men's clothing", icon: IoIosMan, href: "/category/men's clothing" },
  {
    name: "Women's clothing",
    icon: IoIosWoman,
    href: "/category/women's clothing",
  },
];

export default function Sidebar({ children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  return (
    <Box>
      <Flex position="relative">
        <Box
          display={{
            base: "none",
            md: "block",
          }}
          position="fixed"
          top="0"
          left="0"
          zIndex={3}
        >
          <SideBarDesktop />
        </Box>
        <Box flex={1}>
          <Box
            h={"60px"}
            bg={"gray.100"}
            w={"100%"}
            position="fixed"
            top="0"
            zIndex={2}
            // left="240px"
          >
            <Flex
              h={"100%"}
              w="100%"
              bg="white"
              borderBottom="1px solid"
              borderColor="gray.200"
              px={4}
              justifyContent="space-between"
            >
              <Center
                display={{
                  base: "flex",
                  md: "none",
                }}
              >
                <IconButton
                  mr={2}
                  onClick={onOpen}
                  icon={<HamburgerIcon w={5} h={5} />}
                  variant={"ghost"}
                  aria-label={"Toggle Navigation"}
                />
                <Box mr={10}>
                  {/* <Image src={logo} /> */}
                  <Link href="/" passHref>
                    <a>
                      <Text fontSize="2xl" fontWeight="bold">
                        Logo
                      </Text>
                    </a>
                  </Link>
                </Box>
                <Box
                  display={{
                    base: "none",
                    md: "flex",
                  }}
                ></Box>
              </Center>
              <Spacer />

              <Center>
                {/* <Box mr={2}>
                  <Link href="/product/add_product" passHref>
                    <a>
                      <AddIcon />
                    </a>
                  </Link>
                </Box> */}

                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar
                      w="32px"
                      h="32px"
                      src={
                        "https://img1.kienthucvui.vn/uploads/2019/10/10/anh-chibi-naruto_110701874.jpg"
                      }
                    />
                  </MenuButton>
                  <MenuList>
                    <MenuItem>Settings</MenuItem>
                    <MenuDivider />
                    <MenuItem
                      onClick={() => {
                        logout(router);
                      }}
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Center>
            </Flex>
          </Box>
          <Box
            mt="60px"
            ml={{
              base: "0px",
              md: "240px",
            }}
            position="relative"
          >
            {children}
          </Box>
        </Box>
      </Flex>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="full">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Flex alignItems="center" mx={"16px"} px={"16px"}>
              <Box>
                {/* <Image src={logo} /> */}
                <Link href="/" passHref>
                  <a>
                    <Text fontSize="2xl" fontWeight="bold">
                      Logo
                    </Text>
                  </a>
                </Link>
              </Box>
            </Flex>
          </DrawerHeader>

          <DrawerBody>
            {LinkItems.map((item, index) => (
              <Link href={item.href} passHref key={index}>
                <a>
                  <Box mx={"16px"} h={"56px"}>
                    <Flex
                      h={"100%"}
                      p={"16px"}
                      cursor={"pointer"}
                      _hover={{
                        bg: "#0BC5EA",
                        color: "white",
                        borderRadius: "8px",
                      }}
                    >
                      <Center>
                        <Icon as={item.icon} mr={"16px"} />
                        <Box>{item.name}</Box>
                      </Center>
                    </Flex>
                  </Box>
                </a>
              </Link>
            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}

const SideBarDesktop = () => {
  return (
    <Box
      minH={"100vh"}
      bg={"white"}
      w={"240px"}
      borderRight={"1px solid "}
      borderColor={"gray.200"}
      overflowY={"hidden"}
    >
      <Flex w={"50px"} h={"80px"} alignItems="center" mx={"32px"}>
        {/* <Image src={logo} /> */}
        <Link href="/" passHref>
          <a>
            <Text fontSize="2xl" fontWeight="bold">
              Logo
            </Text>
          </a>
        </Link>
      </Flex>
      {LinkItems.map((item, index) => (
        <Link href={item.href} passHref key={index}>
          <a>
            <Box key={index} mx={"16px"} h={"56px"}>
              <Flex
                h={"100%"}
                p={"16px"}
                cursor={"pointer"}
                _hover={{
                  bg: "#0BC5EA",
                  color: "white",
                  borderRadius: "8px",
                }}
              >
                <Center>
                  <Icon as={item.icon} mr={"16px"} />
                  <Box>{item.name}</Box>
                </Center>
              </Flex>
            </Box>
          </a>
        </Link>
      ))}
    </Box>
  );
};
