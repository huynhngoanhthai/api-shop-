# shop API

API này cung cấp các endpoint để quản lý người dùng trong hệ thống. Người dùng có thể đăng ký, đăng nhập và lấy thông tin về các người dùng trong hệ thống.

## Thiết kế cơ sở dữ liệu

Cơ sở dữ liệu được thiết kế với ba bảng chính:
- `USER`: Bảng chứa thông tin cơ bản của người dùng.
- `STAFF`: Bảng chứa thông tin của nhân viên, bao gồm thông tin thống kê.
- `MANAGER`: Bảng chứa thông tin của người quản lý, có quyền truy cập vào tất cả các bảng.

## Stored Procedures

1. `sp_get_all_users`: Lấy tất cả người dùng từ cơ sở dữ liệu.
2. `sp_create_user`: Tạo một người dùng mới với các thông tin cơ bản và quyền truy cập tùy chỉnh.
3. `sp_login`: Đăng nhập vào hệ thống.

## API Endpoints

### Đăng nhập

**POST** `/api/v1/auth/login`

Endpoint này cho phép người dùng đăng nhập vào hệ thống.

#### Yêu cầu

```json
{
    "username": "string",
    "password": "string"
}
```

#### Phản hồi

- **200 OK**: Đăng nhập thành công. Phản hồi bao gồm thông tin về người dùng và vai trò của họ.
- **401 Unauthorized**: Sai thông tin đăng nhập hoặc tài khoản không tồn tại.

### Đăng ký

**POST** `/api/v1/auth/register`

Endpoint này cho phép người dùng đăng ký tài khoản mới trong hệ thống.

#### Yêu cầu

```json
{
    "username": "string",
    "password": "string",
    "email": "string",
    "age": "number",
    "address": "string",
    "phone": "string",
    "role": "string" // Optional
}
```

#### Phản hồi

- **200 OK**: Đăng ký tài khoản thành công.
- **400 Bad Request**: Lỗi khi dữ liệu đầu vào không hợp lệ hoặc trùng lặp thông tin độc nhất.

### Lấy thông tin người dùng

**GET** `/api/v1/auth`

Endpoint này trả về tất cả thông tin về người dùng trong hệ thống.

#### Phản hồi

- **200 OK**: Danh sách tất cả người dùng trong hệ thống.

## Tham khảo

- [Express.js](https://expressjs.com/): Framework Node.js cho xây dựng API.
- [MySQL](https://www.mysql.com/): Hệ quản trị cơ sở dữ liệu.
