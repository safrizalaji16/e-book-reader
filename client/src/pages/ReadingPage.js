import React, { useEffect } from "react";
import ViewSDKClient from "../configs/ViewSDKClient";

function ReadingPage({ fileId }) {
  useEffect(() => {
    const viewSDKClient = new ViewSDKClient();
    viewSDKClient.ready().then(() => {
      viewSDKClient.previewFile("pdf-div", {
        location: {
          url: `https://res.cloudinary.com/your-cloud-name/image/upload/${fileId}.pdf`,
        },
      });
    });
  }, [fileId]);

  return <div id="pdf-div"></div>;
}

export default ReadingPage;
