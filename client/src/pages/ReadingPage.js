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
      viewSDKClient
        .previewFile("pdf-div", url, fileName, fileId, {
          enableAnnotationAPIs: true,
          includePDFAnnotations: true,
        })
        .then((adobeViewer) => {
          console.log(adobeViewer, "<<<<<<<");
          adobeViewer.getAnnotationManager().then((annotationManager) => {
            annotationManager.registerAnnotationCreatedListener(
              (annotation) => {
                console.log("Annotation Created", annotation);
                const annotations =
                  JSON.parse(localStorage.getItem("annotations")) || {};
                annotations[`${fileId}-${annotation.id}`] = annotation;
                localStorage.setItem(
                  "annotations",
                  JSON.stringify(annotations)
                );
              }
            );
            annotationManager.registerAnnotationUpdatedListener(
              (annotation) => {
                console.log("Annotation Updated", annotation);
                const annotations =
                  JSON.parse(localStorage.getItem("annotations")) || {};
                annotations[`${fileId}-${annotation.id}`] = annotation;
                localStorage.setItem(
                  "annotations",
                  JSON.stringify(annotations)
                );
              }
            );
            annotationManager.registerAnnotationDeletedListener(
              (annotation) => {
                console.log("Annotation Deleted", annotation);
                const annotations =
                  JSON.parse(localStorage.getItem("annotations")) || {};
                delete annotations[`${fileId}-${annotation.id}`];
                localStorage.setItem(
                  "annotations",
                  JSON.stringify(annotations)
                );
              }
            );
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
