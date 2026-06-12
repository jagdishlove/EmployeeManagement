import makeRequest from "../api/api";

export const authService = {
  async signIn(email, password) {
    const response = await makeRequest("POST", "/auth/login", {
      email,
      password,
    });
    return {
      user: response.user,
      session: response.session,
      profile: response.profile,
      role: response.profile?.role || "USER",
      empId: response.profile?.employee_id,
      userName: response.profile?.first_name || email.split("@")[0],
    };
  },

  async signUp(email, password, userData) {
    return await makeRequest("POST", "/auth/register", {
      email,
      password,
      ...userData,
    });
  },

  async signOut() {
    await makeRequest("POST", "/auth/logout");
  },

  async getSession() {
    const response = await makeRequest("GET", "/auth/session");
    return {
      ...response.session,
      profile: response.profile,
    };
  },

  async getCurrentUser() {
    const response = await makeRequest("GET", "/auth/me");
    return response.user;
  },

  async resetPassword(email) {
    await makeRequest("POST", "/auth/forgot-password", { email });
  },

  async updatePassword(newPassword) {
    await makeRequest("POST", "/auth/reset-password", { newPassword });
  },

  onAuthStateChange(_callback) {
    return () => {};
  },
};

export default authService;
