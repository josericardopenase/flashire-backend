import ApiService from "@davinci/ApiService"
import { Teacher } from "@wowtypes/db/teacher"

const TeacherProfileService = new ApiService<Teacher>(["teachers"], "users/teacher_profiles/")

export default TeacherProfileService
