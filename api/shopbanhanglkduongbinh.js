export default {
  async fetch(request, env) {
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*", // Phù hợp với mọi tên miền
      "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      const url = new URL(request.url);

      if (request.method === "POST" && url.pathname === "/api/register") {
        const body = await request.json();
        const { username, password, email } = body;

        if (!username || !password) {
          return new Response(
            JSON.stringify({
              success: false,
              message: "Thiếu thông tin đăng ký!",
            }),
            {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            },
          );
        }

        const userKey = `user_${username.toLowerCase()}`;
        // Kiểm tra xem User đã tồn tại trong mảng KV tên là LOCKET_USERS chưa
        const existingUser = await env.LOCKET_USERS.get(userKey);

        if (existingUser) {
          return new Response(
            JSON.stringify({
              success: false,
              message: "Tên đăng nhập đã tồn tại!",
            }),
            {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            },
          );
        }

        // Lưu user vào KV
        const userData = { username, password, email, createdAt: Date.now() };
        await env.LOCKET_USERS.put(userKey, JSON.stringify(userData));

        return new Response(
          JSON.stringify({ success: true, message: "Đăng ký thành công!" }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }

      if (request.method === "POST" && url.pathname === "/api/login") {
        const body = await request.json();
        const { username, password } = body;

        if (!username || !password) {
          return new Response(
            JSON.stringify({
              success: false,
              message: "Vui lòng nhập đủ thông tin!",
            }),
            {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            },
          );
        }

        const userKey = `user_${username.toLowerCase()}`;
        const userDataString = await env.LOCKET_USERS.get(userKey);

        if (!userDataString) {
          return new Response(
            JSON.stringify({
              success: false,
              message: "Tài khoản không tồn tại!",
            }),
            {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            },
          );
        }

        const userData = JSON.parse(userDataString);

        if (userData.password !== password) {
          return new Response(
            JSON.stringify({
              success: false,
              message: "Mật khẩu không chính xác!",
            }),
            {
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            },
          );
        }

        // Trả về token và dữ liệu (bạn có thể cải tiến tạo JWT token ở đây thay vì trả chuỗi cứng)
        return new Response(
          JSON.stringify({
            success: true,
            token: "KV-TOKEN-" + Math.random().toString(36).substr(2),
            user: { username: userData.username, email: userData.email },
          }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          },
        );
      }

      // Fallback cho URL khác
      return new Response(
        JSON.stringify({
          success: false,
          message: "Endpoint không hợp lệ hoặc đã bị chặn.",
        }),
        {
          status: 404,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    } catch (e) {
      return new Response(
        JSON.stringify({ success: false, message: e.message }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }
  },
};
