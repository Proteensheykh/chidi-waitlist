import Image from "next/image";
import type { ComponentProps } from "react";

type MdxComponents = {
  img: (props: ComponentProps<"img">) => JSX.Element | null;
};

export const mdxComponents: MdxComponents = {
  img: ({ src, alt }) => {
    if (!src || typeof src !== "string") {
      return null;
    }

    return (
      <Image
        src={src}
        alt={alt ?? ""}
        width={1200}
        height={675}
        className="my-8 rounded-xl"
      />
    );
  },
};
