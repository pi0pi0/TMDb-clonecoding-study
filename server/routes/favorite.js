const router = express.Router();
const { Favorite } = require('../models/Favorite');

{/*router 는 express.Router에서 제공 .. 컨트롤러=라우트 */}
router.post("/favoriteNumber", (req,res)=>{
    //req.body.movieId (index.js에 bodyParser가 있어서 프론트의request param 받기 가능.)

    //mongoDB에서 좋아요 개수 가져오기 (exec)
    Favorite.find({"movieId":req.body.movieId})
        .exec((err, info) => {
            if(err) return res.status(400).send(err)
            //성공 , 프론트에 표출하기(리턴) 
            res.status(200).json({ favoriteNumber: info.length , success:true})
        })
 
})

router.post("/favorited", (req,res)=>{
    
    Favorite.find({"movieId":req.body.movieId, "userFrom":req.body.userFrom})
        .exec((err, info) => {
            if(err) return res.status(400).send(err)
            
            let result = false;

            if(info.length !== 0){
                result = true;
            }

            //info가 비어있다면 내가 이 영화를 좋아요 리스트에 넣지 않은것임.
            res.status(200).json({ favorited: result , success:true})
        })
 
})

module.exports = router;
