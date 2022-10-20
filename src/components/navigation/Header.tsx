import { Avatar, Box, Flex, Icon, IconButton, Menu, MenuButton, MenuItem, MenuList, Stack, Text } from "@chakra-ui/react"
import IconBadge from "@components/badge/IconBadge"
import { FormikForm, FormikInput } from "@components/forms"
import { logOut, useCompany, useMe } from "@storage/reducer/auth.reducer"
import React from "react"
import { BiBell, BiChevronDown, BiCommentDetail, BiLogOut, BiSearch } from "react-icons/bi"
import { useDispatch } from "react-redux"

function ProfileHeader() {
	const me = useMe()
	const company = useCompany()
	const dispatch = useDispatch()

	return (
		<Menu>
			<MenuButton _hover={{ bgColor: "gray.100" }} borderRadius="50rem">
				<Flex textAlign="left" alignItems="center" width="max-content" px="2" py="1" cursor="pointer">
					<Avatar src={me?.avatar} width="40px" height="40px" name={me?.first_name + " " + me?.last_name} cursor="pointer" />
					<Box ml="2">
						<Text fontWeight="semibold" pb="0" fontSize="15px">
							{me?.first_name}
						</Text>
						<Text fontSize="13px" pt="0" color="gray.500">
							{company?.name}
						</Text>
					</Box>
					<Icon ml="3" as={BiChevronDown}></Icon>
				</Flex>
			</MenuButton>
			<MenuList>
				<MenuItem color="red.400" onClick={() => dispatch(logOut({}))} icon={<Icon mb="0" as={BiLogOut} />} alignItems="center">
					Desconectar
				</MenuItem>
			</MenuList>
		</Menu>
	)
}

export default function Header() {
	return (
		<Box bgColor="white" w="100%" p="2" px="5" position="fixed" zIndex="30" borderBottomWidth="2px" borderBottomColor="gray.100">
			<Flex ml="270px" alignItems="center" justifyContent="space-between" p="1">
				<Flex w="100%">
					<Flex maxW="40%" w="100%">
						<FormikForm initialValues={{}} onSubmit={() => console.log("search")}>
							<FormikInput
								name="search"
								width="100%"
								placeholder="Search here..."
								variant="filled"
								w="100%"
								leftIcon={<Icon color="gray.500" as={BiSearch}></Icon>}
								colorScheme="facebook"
							></FormikInput>
						</FormikForm>
					</Flex>
				</Flex>
				<Stack gap={2} direction="row" alignItems="center" color="gray.700">
					<IconButton
						aria-label="Call Segun"
						size="md"
						icon={
							<IconBadge show={true}>
								<Icon as={BiBell} />
							</IconBadge>
						}
						borderRadius="50%"
					/>

					<IconButton aria-label="Call Segun" size="md" icon={<Icon as={BiCommentDetail} />} borderRadius="50%" />
					<ProfileHeader></ProfileHeader>
				</Stack>
			</Flex>
		</Box>
	)
}
