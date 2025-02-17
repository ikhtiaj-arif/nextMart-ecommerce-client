import { Button } from "@/components/ui/button";
import { getCurrentUser } from "@/services/AuthService";

const HomePage = async () => {
  const user = await getCurrentUser();
  console.log(user);
  return (
    <div>
      <h1>Welcome to next mart homepage</h1>
      <Button > Click me</Button>
    </div>
  );
};

export default HomePage;