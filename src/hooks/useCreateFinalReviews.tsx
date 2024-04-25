import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase";
import toast from 'react-hot-toast';

const useCreateFinalReviews = () => {

  const [iDLoading, setIDLoading] = useState("");

  const createFinalReviews = async (
    reviewData: any,
    collectionName: string
  ) => {
    setIDLoading(reviewData?.projectId);
    try {
      const docRef = await addDoc(collection(db, collectionName), reviewData);
      console.log("Review Sent with ID: ", docRef.id);
      toast.success("Review Sent")

      const finalReviewsWithId = { ...reviewData, id: docRef.id };
      console.log(finalReviewsWithId);
      setIDLoading("");
      return finalReviewsWithId;
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("Error sending review")
      setIDLoading("");
      throw error;
    }
  };

  return {createFinalReviews, iDLoading};
};

export default useCreateFinalReviews;