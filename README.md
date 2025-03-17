![image](https://github.com/user-attachments/assets/faee4ace-948f-4ef7-9893-817e7d52be00)

url of datasource: https://jsonplaceholder.typicode.com/photos

--giả sử đã tự setup được redis trên máy
clone repo về file tên gì đấy (ở đây tên file lưu là main)

chạy lệnh sau để tải mấy cái cần thiết:

--
npm install express axios redis cors
--

nhớ tải cả cái nodejs (hỏi gpt hôm trước t dùng 1 lệnh npm gì đấy là xong rồi)

khởi động server bằng lệnh:

--
nodemon index.js
--
![image](https://github.com/user-attachments/assets/e0245a2e-4a7e-4148-afe8-c4c494b0be03)

Khởi động Ubuntu trên WSL:

--
wsl -d Ubuntu
--

Cập nhật và cài đặt Redis:

--
sudo apt update
sudo apt install redis-server -y
--

Khởi động Redis:

--
sudo service redis-server start
--

Kiểm tra Redis có hoạt động không bằng cách chạy:
(Nếu trả về PONG là thành công)

--
redis-cli ping
--

truy cập redis:

--
redis-cli
--

lệnh lấy tất cả giá trị(Nhớ vì dùng nhiều):

--
keys *
--

thử dùng lệnh lấy giá trị và thấy trong redis chưa có dữ liệu nào nó sẽ hiện:

--
(empty array)
--

khởi động server (copy tên file vừa clone bên trên vào cmd gõ lệnh):

--
nodemon index.js
--

nếu hiện như này thì là đã chạy
![image](https://github.com/user-attachments/assets/9b218d41-8ca6-4e14-8470-6d0e5a264bab)

mở file test.html cùng folder với index.js để thực hiện gửi request 
![image](https://github.com/user-attachments/assets/6aad74b4-f998-499c-8bfd-e85bcaae8425)

tiến hành điền id ngẫu nhiên từ 1-100 trên giao diện html vừa run
![image](https://github.com/user-attachments/assets/34a1996b-3b07-402a-98fa-cb3b305b251c)

thấy thời gian thực thi bị lâu vì trong redis chưa có data cần tìm, lúc này sẽ gọi API bên ngoài để fetch data về redis (thử gõ lại lệnh keys thì sẽ thấy sự khác biệt):
![image](https://github.com/user-attachments/assets/552d9ab5-a30b-4b89-bad8-b368bb43af60)

đồng thời để ý bên terminal của server sẽ thấy cache miss (tức là trong redis chưa tìm thấy dữ liệu) nhưng từ lần thứ 2 trở đi sẽ hiện cache hit(tức là dữ liệu đã được lưu trong redis)
bên cạnh đó có thể thấy giời gian thực thi trên giao diện giảm đi rất nhiều lần so với lần đầu lấy dữ liệu
![image](https://github.com/user-attachments/assets/f9bea647-9226-4fc8-bbeb-6af52ea15a9a)

tuy nhiên dữ liệu cache trong redis sẽ tự xóa theo dòng code nàyy trong file index.js(Nếu muốn lâu hơn thì có thể tùy chỉnh theo mục đích cá nhân)

--
const DEFAULT_EXPIRATION = 3600; // Cache trong 1 giờ
--





