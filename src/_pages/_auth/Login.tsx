import ButtonLoader from "@/components/shared/ButtonLoader";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useAuth from "@/hooks/useAuth";
import { useLogin } from "@/hooks/useAuthActions";
import { loginSchema } from "@/schema/authSchema";
import type { User } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { jwtDecode } from "jwt-decode";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import type z from "zod";

const Login = () => {
  const { setAuth } = useAuth();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {},
  });

  const { mutateAsync, isPending } = useLogin();
  async function onSubmit(values: z.infer<typeof loginSchema>) {
    const res = await mutateAsync(values);

    const decode = jwtDecode<User>(res.data.data.access_token);
    setAuth({
      accessToken: res.data.data.access_token,
      user: decode,
    });
  }
  return (
    <div className="bg-background w-full min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="m@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="your password"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <ButtonLoader
                disabled={isPending}
                type="submit"
                className="w-full mt-6"
              >
                Login
              </ButtonLoader>

              <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link to={"/signup"} className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex-col gap-2"></CardFooter>
      </Card>
    </div>
  );
};

export default Login;
