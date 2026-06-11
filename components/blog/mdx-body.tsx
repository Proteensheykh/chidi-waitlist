import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/blog/mdx-components";

interface MdxBodyProps {
  source: string;
}

export function MdxBody({ source }: MdxBodyProps) {
  return (
    <div className="prose prose-neutral max-w-none">
      <MDXRemote source={source} components={mdxComponents} />
    </div>
  );
}
