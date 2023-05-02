import { useEffect } from "react";
import ViewSDKClient from "../configs/ViewSDKClient";
import { useLocation, useParams } from "react-router-dom";
import queryString from "query-string";

function ReadingPage() {
  const { fileId } = useParams();
  const location = useLocation();
  const { url, fileName } = queryString.parse(location.search);

  useEffect(() => {
    const viewSDKClient = new ViewSDKClient();
    viewSDKClient.ready().then(() => {
      const previewFilePromise = viewSDKClient.previewFile(
        "pdf-div",
        url,
        fileName,
        fileId,
        {}
      );
      previewFilePromise.then((adobeViewer) => {
        adobeViewer.getAnnotationManager().then((annotationManager) => {
          annotationManager.registerAnnotationCreatedListener((annotation) => {
            console.log("Annotation Created", annotation);
            // implement your code to store the annotation here
          });
          annotationManager.registerAnnotationUpdatedListener((annotation) => {
            console.log("Annotation Updated", annotation);
            // implement your code to update the annotation here
          });
          annotationManager.registerAnnotationDeletedListener((annotation) => {
            console.log("Annotation Deleted", annotation);
            // implement your code to delete the annotation here
          });
        });
      });
    });
  }, [url, fileName, fileId]);

  return (
    <div
      id="pdf-div"
      style={{
        height: "100vh",
        overflow: "hidden",
      }}
    ></div>
  );
}

export default ReadingPage;
