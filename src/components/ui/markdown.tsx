import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Markdown = ({ children }: { children: string }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      className="whitespace-pre-line"
      components={{
        h1: ({ children }) => (
          <h1 className="text-3xl font-bold  mt-8">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-2xl font-semibold mt-5">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-xl font-medium mt-3">{children}</h3>
        ),
        p: ({ children }) => <p className="text-sm">{children}</p>,
      }}
    >
      {children}
    </ReactMarkdown>
  );
};

export default Markdown;
