# NestJS - messenger project

NestJS là một framework được sử dụng để xây dựng các ứng dụng phía máy chủ, sử dụng JavaScript và hỗ trợ TypeScript.
Được xây dựng trên nền là framework Express, NestJS kế thừa các tính năng của Express và mở rộng hơn để giúp xây dựng các ứng dụng
dễ mở rộng, bảo trì. NestJS sử dụng Dependency Injection để quản lý khởi tạo vào chia sẻ các thành phần.
NestJS sử dụng kiến trúc module, các module giúp project được tổ chức gọn gàng. Kiến trúc module phân tách ứng dụng thành các khối
chức năng. Các thành phần như controller, provider (service) được đóng gói lại vào module giúp kiểm soát được độ phức tạp của project.
Controller nhận HTTP request, xử lý chúng và trả về respone
Provider là các class chứa logic nghiệp vụ, giao tiếp với DB, có thể được Inject vào trong controller, module và các service khác

![Alt text](request_life_cycle.jpg)

- Middleware là function được trước route handler, có thể truy cập đến Request và Respone. Tương tự như trong Express, middleware có thể thực hiện các task: thực hiện một đoạn code bất kì, thay đổi request và respone, trả về respone, gọi đến handler hoặc middleware tiếp theo
- Guard có nhiệm vụ quyết định xem request gửi đến có được thực hiện bởi route handler không (authentication và authorization), guard có thể truy cập tới ExecutionContext
- Interceptor có thể truy cập tới luồng dữ liệu Obserable trong quá trình handler xử lý request. Interceptor có thể gán thêm logic vào trước vào sau route handler, biến đổi kết quả trả về (ví dụ null -> []), truy vấn trong cache thay vì truy vấn DB để tăng tốc độ xử lý request, loggin, set headers
- Pipe có nhiệm vụ validate và transform data. Được thực hiện ngay trước route handler
- Exception filter tiếp nhận exception được thrown trong quá trình xử lý request và trả về respone tuỳ chỉnh theo yêu cầu sao cho user-friendly

Project Messenger sử dụng Postgresql và ORM prisma
DB có 4 bảng: User, Message, Room, RefreshToken

Project được phân tách thành các module

- UserModule: CRUD user (src/user)
- MessageModule: CRUD message (src/message)
- AuthModule: sign-in, sign-up, authentication với jwt (src/auth)
- PrismaModue: kết nối với DB (src/prisma)
- RoomModule: CRUD room (src/room)
- TokenModule: chứa logic giúp xử lý refresh token, có thể được import vào các module khác (src/tokenDB)

Project sử dụng passportjs giúp xử lý authentication, guard trả về true để request được tiếp tục xử lý
Passport cung cấp các strategy (src/auth/stategy) giúp xây dựng guard (src/auth/guard) dễ hơn. Authentication guard với jwt được áp dụng global scope, nhưng sẽ có những route không cần thiết phải authen.
JwtAccessGuard sử dụng JwtAccessStrategy (src/auth/strategy/jwt.strategy.ts) để extract jwt token từ headers, validate jwt token và trả lại payload trong request.
Custom decorator @Public() (src/auth/decorator/public.decorator.ts) được sử dụng để giúp route bỏ qua guard.

Các request sau khi vượt qua guard sẽ đến interceptor (src/interceptor), trong project, LoggingInterceptor được áp dụng global scoped.
Logging interceptor được thực hiện trước và sau route handler, có nhiệm vụ log thời gian xử lý request, catch error, log thời gian và chuyển tiếp đến exeption filter.

Khi đến route handler, nếu cần thiết, các request sẽ phải đi đến pipe, trong đó có các DTO (data transfer object), ParseIdPipe (src/pipe). Sau khi pipe validate và trasform data thì request sẽ được xử lý bởi route handler.

Trong quá trình trên, nếu như có exception được throw, exception sẽ được chuyển đến Exception filter và kết thúc request-respone cycle. HttpExceptionFilter (src/filter/HttpExceptiom.filter.ts) sẽ catch các exception, trả về repspone có dạng
{
statusCode: ,
error: ,
message: ,
path: ,
}
