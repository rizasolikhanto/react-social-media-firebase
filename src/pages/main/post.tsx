import {addDoc, getDocs, collection, query, where, deleteDoc, doc} from "firebase/firestore";
import {auth, db} from "../../config/firebase";
import {Post as IPost} from "./main";
import {useAuthState} from "react-firebase-hooks/auth";
import {useEffect, useState} from "react";
interface Props {
	post: IPost;
}

interface Like {
	likeId: string;
	userId: string;
}

export const Post = (props: Props) => {
	const {post} = props;
	const [user] = useAuthState(auth);

	const [likes, setLikes] = useState<Like[] | null>(null);
	const likesRef = collection(db, "likes");

	const likesDoc = query(likesRef, where("postId", "==", post.id));

	const getLikes = async () => {
		const data = await getDocs(likesDoc);
		setLikes(data.docs.map(doc => ({userId: doc.data().userId, likeId: doc.id})));
	};

	useEffect(() => {
		getLikes();
	}, []);
	const addLike = async () => {
		try {
			const newDoc = await addDoc(likesRef, {userId: user?.uid, postId: post.id});
			if (user) {
				setLikes(prev => (prev ? [...prev, {userId: user.uid, likeId: newDoc.id}] : [{userId: user.uid, likeId: newDoc.id}]));
			}
		} catch (err) {
			console.log(err);
		}
	};
	const removeLike = async () => {
		try {
			const likesToDeletequery = query(likesRef, where("postId", "==", post.id), where("userId", "==", user?.uid));
			const likeToDeleteData = await getDocs(likesToDeletequery);
			const likeId = likeToDeleteData.docs[0].id;
			const likeToDelete = doc(db, "likes", likeId);
			await deleteDoc(likeToDelete);
			if (user) {
				setLikes(prev => prev && prev.filter(like => like.likeId !== likeId));
			}
		} catch (err) {
			console.log(err);
		}
	};
	const hasUserLiked = likes?.find(like => like.userId === user?.uid);

	return (
		<div>
			<div className="title">
				<h1>{post.title}</h1>
			</div>
			<div className="body">
				<p>{post.description}</p>
			</div>
			<div className="footer">
				<p>@{post.username}</p>
				<button onClick={hasUserLiked ? removeLike : addLike}>{hasUserLiked ? <>&#128078;</> : <>&#128077;</>}</button>
				{likes && <p>Likes:{likes.length}</p>}
			</div>
		</div>
	);
};
