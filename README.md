# messenger

NestJS là một framework được sử dụng để xây dựng các ứng dụng phía máy chủ, sử dụng JavaScript và hỗ trợ TypeScript.
Được xây dựng trên nền là framework Express, NestJS kế thừa các tính năng của Express và mở rộng hơn để giúp xây dựng các ứng dụng
dễ mở rộng, bảo trì. NestJS sử dụng Dependency Injection để quản lý khởi tạo vào chia sẻ các thành phần.
NestJS sử dụng kiến trúc module, các module giúp project được tổ chức gọn gàng. Kiến trúc module phân tách ứng dụng thành các khối
chức năng. Các thành phần như controller, provider (service) được đóng gói lại vào module giúp kiểm soát được độ phức tạp của project.
Controller nhận HTTP request, xử lý chúng và trả về respone
Provider là các class chứa logic nghiệp vụ, giao tiếp với DB, có thể được Inject vào trong controller, module và các service khác
