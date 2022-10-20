import ApiService from "@davinci/ApiService"
import { User } from "@wowtypes/db/users"

const EmployeeService = new ApiService<User>(["employees"], "users/")

export default EmployeeService
