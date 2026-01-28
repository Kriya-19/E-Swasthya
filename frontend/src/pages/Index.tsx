// Update this page (the content is just a fallback if you fail to update the page)
import T from '@/components/T';

const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">
          <T>Welcome to Your Blank App</T>
        </h1>
        <p className="text-xl text-muted-foreground">
          <T>Start building your amazing project here!</T>
        </p>
      </div>
    </div>
  );
};

export default Index;
