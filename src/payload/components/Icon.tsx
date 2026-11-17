import Image from "next/image";
import React from "react";

export function Icon() {
  return (
    <div
      style={{
        width: "28px",
        height: "28px",
        position: "relative",
        borderRadius: "6px",
        overflow: "hidden",
        backgroundColor: "#ffffff",
        padding: "3px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        src="/brand/the-iam-lab-logo.png"
        alt="The IAM Lab"
        width={22}
        height={22}
        style={{ objectFit: "contain", width: "100%", height: "100%" }}
      />
    </div>
  );
}

export default Icon;
