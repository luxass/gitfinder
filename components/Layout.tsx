type LayoutProps = {
    children: React.ReactNode;
};

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="h-screen w-full bg-dark-blue flex justify-center items-center flex-col">
            {children}
        </div>
    );
}
