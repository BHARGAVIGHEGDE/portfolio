export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-t from-primary/[1%] to-transparent">
      <div className="container mx-auto flex items-center justify-center py-6">
        <p className="text-xs text-muted-foreground">
          Made with ❤️ by{" "}
          <span className="font-semibold">bhargavi</span>
        </p>
      </div>
      <div className="h-1 bg-[radial-gradient(closest-side,#8486ff,#42357d,#5d83ff,transparent)] opacity-50" />
    </footer>
  );
}
