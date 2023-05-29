import React, { ReactNode, useState, useEffect } from "react";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Button,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiDisc,
  FiLogOut,
} from "react-icons/fi";
import { IconType } from "react-icons";
import { ReactText } from "react";
import { NavLink, useNavigate, useParams, Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { userSignOut } from "../../service/service";

export default function SimpleSidebar({ children }, props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: "flex", md: "none" }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  const [NavItems, setNAvItems] = useState([]);
  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("user")).id;
    if (JSON.parse(localStorage.getItem("user")).role === "Admin") {
      setNAvItems([
        { name: "Home Admin", icon: FiHome, path: `/Admin/${id}/home` },
        {
          name: "Manage Users",
          icon: FiTrendingUp,
          path: `/Admin/${id}/manage-users`,
        },
        {
          name: "Manage Products",
          icon: FiCompass,
          path: `/Admin/${id}/manage-products`,
        },
        {
          name: "Manage Store",
          icon: FiStar,
          path: `/Admin/${id}/manage-store`,
        },
        {
          name: "Settings Admin",
          icon: FiSettings,
          path: `/Admin/${id}/settings`,
        },
        {
          name: "Disconnect",
          icon: FiLogOut,
          path: `/Admin/${id}/settings`,
        },
      ]);
    } else if (JSON.parse(localStorage.getItem("user")).role === "Client") {
      setNAvItems([
        { name: "Home Client", icon: FiHome, path: `/Client/${id}/home` },
        {
          name: "Shopping",
          icon: FiTrendingUp,
          path: `/Client/${id}/products`,
        },
        {
          name: "My Cart",
          icon: FiCompass,
          path: `/Client/${id}/cart`,
        },
        {
          name: "My Settings",
          icon: FiStar,
          path: `/Client/${id}/settings`,
        },
        {
          name: "Disconnect",
          icon: FiLogOut,
          path: `/Client/${id}/settings`,
        },
      ]);
    } else {
      setNAvItems([
        { name: "Home Seller", icon: FiHome, path: `/Seller/${id}/home` },
        {
          name: "My Stock",
          icon: FiTrendingUp,
          path: `/Seller/${id}/stock`,
        },
        {
          name: "My Settings",
          icon: FiStar,
          path: `/Seller/${id}/settings`,
        },
        {
          name: "Disconnect",
          icon: FiLogOut,
          path: `/Seller/${id}/settings`,
        },
      ]);
    }
  }, []);
  const navigate = useNavigate();
  const logout = () => {
    userSignOut(auth);
    localStorage.clear();
    navigate("signIn");
    navigate(0);
  };
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {NavItems.map((link) => {
        return link.name === "Disconnect" ? (
          <NavItem key={link.name} icon={link.icon} onClick={() => logout()}>
            Disconnect
          </NavItem>
        ) : (
          <NavItem key={link.name} icon={link.icon} path={link.path}>
            {link.name}
          </NavItem>
        );
      })}
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Link
      to={rest.path}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent="flex-start"
      {...rest}
    >
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Logo
      </Text>
    </Flex>
  );
};
