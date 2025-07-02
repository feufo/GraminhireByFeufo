import { supabase } from "./supabase";
import type { User } from "./supabase";

export interface AuthUser extends User {
  // Add any additional auth-specific fields
}

export const authService = {
  // Sign up new user
  async signUp(
    email: string,
    password: string,
    role: string,
    fullName: string,
  ) {
    try {
      // Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      if (authData.user) {
        // Create user record in our users table
        const { data: userData, error: userError } = await supabase
          .from("users")
          .insert([
            {
              id: authData.user.id,
              email,
              role,
              full_name: fullName,
              verified: false,
            },
          ])
          .select()
          .single();

        if (userError) throw userError;

        // Create user profile
        const { error: profileError } = await supabase
          .from("user_profiles")
          .insert([
            {
              user_id: authData.user.id,
            },
          ]);

        if (profileError)
          console.error("Profile creation error:", profileError);

        return { user: userData, authUser: authData.user };
      }

      throw new Error("User creation failed");
    } catch (error) {
      console.error("Sign up error:", error);
      throw error;
    }
  },

  // Sign in user
  async signIn(email: string, password: string) {
    try {
      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (authError) throw authError;

      if (authData.user) {
        // Get user data from our users table
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("*")
          .eq("id", authData.user.id)
          .single();

        if (userError) throw userError;

        return { user: userData, authUser: authData.user };
      }

      throw new Error("Sign in failed");
    } catch (error) {
      console.error("Sign in error:", error);
      throw error;
    }
  },

  // Sign out user
  async signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  // Get current user
  async getCurrentUser() {
    try {
      const { data: authData } = await supabase.auth.getUser();

      if (authData.user) {
        const { data: userData, error } = await supabase
          .from("users")
          .select("*")
          .eq("id", authData.user.id)
          .single();

        if (error) throw error;
        return userData;
      }

      return null;
    } catch (error) {
      console.error("Get current user error:", error);
      return null;
    }
  },

  // Listen to auth state changes
  onAuthStateChange(callback: (user: AuthUser | null) => void) {
    return supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const user = await this.getCurrentUser();
        callback(user);
      } else {
        callback(null);
      }
    });
  },
};
