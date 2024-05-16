import {express} from "express"
import {valideToken} from "../middlewares/valideTokenHandler.js"
import {registerUser, loginUser} from "../controllers/userController.js"
import {accessControl} from "../middlewares/accessControl.js"
import {constants} from "../constants.js"
import {errorHandler} from "../middlewares/errorHandler.js"

const router = express.Router();

router.post("/register", registerUser); 
router.post("/login", loginUser);
router.get("/", valideToken, accessControl(constants.ROLE.COORDINATEUR), (req, res) => {
  res.send("Hello World");
});
router.use(errorHandler)
export default router
