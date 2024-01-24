var swiper = new Swiper('.mySwiper', {
	spaceBetween: 30,
	centeredSlides: true,
	autoplay: {
		delay: 2500,
		disableOnInteraction: false,
	},
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
});

let ga_tau = [
	{
		value: 1,
		name: 'Hà Nội',
	},

	{
		value: null,
		name: 'Giáp Bát',
	},
	{
		value: null,
		name: 'Văn Điển',
	},
	{
		value: null,
		name: 'Thường Tín',
	},
	{
		value: null,
		name: 'Chợ Tía',
	},
	{
		value: null,
		name: 'Vạn Điểm',
	},
	{
		value: null,
		name: 'Phú Xuyên',
	},
	{
		value: null,
		name: 'Đồng Văn',
	},
	{
		value: null,
		name: 'Phủ Lý',
	},
	{
		value: null,
		name: 'Bình Lục',
	},
	{
		value: null,
		name: 'Cầu Họ',
	},
	{
		value: null,
		name: 'Đặng Xá',
	},
	{
		value: null,
		name: 'Nam Định',
	},
	{
		value: null,
		name: 'Trình Xuyên',
	},
	{
		value: null,
		name: 'Núi Gôi',
	},
	{
		value: null,
		name: 'Cát Đằng',
	},
	{
		value: null,
		name: 'Ninh Bình',
	},
	{
		value: null,
		name: 'Cầu Yên',
	},
	{
		value: null,
		name: 'Ghềnh',
	},
	{
		value: null,
		name: 'Đồng Giao',
	},
	{
		value: null,
		name: 'Bỉm Sơn',
	},
	{
		value: null,
		name: 'Đò Lèn',
	},
	{
		value: null,
		name: 'Nghĩa Trang',
	},
	{
		value: null,
		name: 'Thanh Hóa',
	},
	{
		value: null,
		name: 'Yên Thái',
	},
	{
		value: null,
		name: 'Minh Khôi',
	},
	{
		value: null,
		name: 'Thị Long',
	},
	{
		value: null,
		name: 'Văn Trai',
	},
	{
		value: null,
		name: 'Khoa Trường',
	},
	{
		value: null,
		name: 'Trường Lâm',
	},
	{
		value: null,
		name: 'Hoàng Mai',
	},
	{
		value: null,
		name: 'Cầu Giát',
	},
	{
		value: null,
		name: 'Yên Lý',
	},
	{
		value: null,
		name: 'Chợ Sy',
	},
	{
		value: null,
		name: 'Mỹ Lý',
	},
	{
		value: null,
		name: 'Quán Hành',
	},
	{
		value: null,
		name: 'Vinh',
	},
	{
		value: null,
		name: 'Yên Xuân',
	},
	{
		value: null,
		name: 'Yên Trung',
	},
	{
		value: null,
		name: 'Đức Lạc',
	},
	{
		value: null,
		name: 'Yên Duệ',
	},
	{
		value: null,
		name: 'Hòa Duyệt',
	},
	{
		value: null,
		name: 'Thanh Luyện',
	},
	{
		value: null,
		name: 'Chu Lễ',
	},
	{
		value: null,
		name: 'Hương Phố',
	},
	{
		value: null,
		name: 'Phúc Trạch',
	},
	{
		value: null,
		name: 'La Khê',
	},
	{
		value: null,
		name: 'Tân Ấp',
	},
	{
		value: null,
		name: 'Đồng Chuối',
	},
	{
		value: null,
		name: 'Kim Lũ',
	},
	{
		value: null,
		name: 'Đồng Lê',
	},
	{
		value: null,
		name: 'Ngọc Lâm',
	},
	{
		value: null,
		name: 'Lạc Sơn',
	},
	{
		value: null,
		name: 'Lệ Sơn',
	},
	{
		value: null,
		name: 'Minh Lệ',
	},
	{
		value: null,
		name: 'Ngân Sơn',
	},
	{
		value: null,
		name: 'Thọ Lộc',
	},
	{
		value: null,
		name: 'Hoàn Lão',
	},
	{
		value: null,
		name: 'Phúc Tự',
	},
	{
		value: null,
		name: 'Đồng Hới',
	},
	{
		value: null,
		name: 'Lệ Kỳ',
	},
	{
		value: null,
		name: 'Long Đại',
	},
	{
		value: null,
		name: 'Mỹ Đức',
	},
	{
		value: null,
		name: 'Phú Hòa',
	},
	{
		value: null,
		name: 'Mỹ Trạch',
	},
	{
		value: null,
		name: 'Thượng Lâm',
	},
	{
		value: null,
		name: 'Sa Lung',
	},
	{
		value: null,
		name: 'Tiên An',
	},
	{
		value: null,
		name: 'Hà Thanh',
	},
	{
		value: null,
		name: 'Đông Hà',
	},
	{
		value: null,
		name: 'Quảng Trị',
	},
	{
		value: null,
		name: 'Diên Sanh',
	},
	{
		value: null,
		name: 'Mỹ Chánh',
	},
	{
		value: null,
		name: 'Phò Trạch',
	},
	{
		value: null,
		name: 'Hiền Sỹ',
	},
	{
		value: null,
		name: 'Văn Xá',
	},
	{
		value: null,
		name: 'Huế',
	},
	{
		value: null,
		name: 'Hương Thủy',
	},
	{
		value: null,
		name: 'Truồi',
	},
	{
		value: null,
		name: 'Cầu Hai',
	},
	{
		value: null,
		name: 'Thừa Lưu',
	},
	{
		value: null,
		name: 'Lăng Cô',
	},
	{
		value: null,
		name: 'Hải Vân Bắc',
	},
	{
		value: null,
		name: 'Hải Vân',
	},
	{
		value: null,
		name: 'Hải Vân Nam',
	},
	{
		value: null,
		name: 'Kim Liên',
	},
	{
		value: null,
		name: 'Thanh Khê',
	},
	{
		value: null,
		name: 'Đà Nẵng',
	},
	{
		value: null,
		name: 'Lệ Trạch',
	},
	{
		value: null,
		name: 'Nông Sơn',
	},
	{
		value: null,
		name: 'Trà Kiệu',
	},
	{
		value: null,
		name: 'Phú Cang',
	},
	{
		value: null,
		name: 'An Mỹ',
	},
	{
		value: null,
		name: 'Tam Kỳ',
	},
	{
		value: null,
		name: 'Diêm Phổ',
	},
	{
		value: null,
		name: 'Núi Thành',
	},
	{
		value: null,
		name: 'Trị Bình',
	},
	{
		value: null,
		name: 'Bình Sơn',
	},
	{
		value: null,
		name: 'Đại Lộc',
	},
	{
		value: null,
		name: 'Quảng Ngãi',
	},
	{
		value: null,
		name: 'Hòa Vinh Tây',
	},
	{
		value: null,
		name: 'Mộ Đức',
	},
	{
		value: null,
		name: 'Thạch Trụ',
	},
	{
		value: null,
		name: 'Đức Phổ',
	},
	{
		value: null,
		name: 'Thủy Trạch',
	},
	{
		value: null,
		name: 'Sa Huỳnh',
	},
	{
		value: null,
		name: 'Tam Quan',
	},
	{
		value: null,
		name: 'Bồng Sơn',
	},
	{
		value: null,
		name: 'Vạn Phú',
	},
	{
		value: null,
		name: 'Phù Mỹ',
	},
	{
		value: null,
		name: 'Khánh Phước',
	},
	{
		value: null,
		name: 'Phù Cát',
	},
	{
		value: null,
		name: 'Bình Định',
	},
	{
		value: null,
		name: 'Quy Nhơn',
	},
	{
		value: null,
		name: 'Diêu Trì',
	},
	{
		value: null,
		name: 'Tân Vinh',
	},
	{
		value: null,
		name: 'Vân Canh',
	},
	{
		value: null,
		name: 'Phước Lãnh',
	},
	{
		value: null,
		name: 'La Hai',
	},
	{
		value: null,
		name: 'Chí Thạnh',
	},
	{
		value: null,
		name: 'Hòa Đa',
	},
	{
		value: null,
		name: 'Tuy Hòa',
	},
	{
		value: null,
		name: 'Đông Tác',
	},
	{
		value: null,
		name: 'Phú Hiệp',
	},
	{
		value: null,
		name: 'Hảo Sơn',
	},
	{
		value: null,
		name: 'Đại Lãnh',
	},
	{
		value: null,
		name: 'Tu Bông',
	},
	{
		value: null,
		name: 'Giã',
	},
	{
		value: null,
		name: 'Hòa Huỳnh',
	},
	{
		value: null,
		name: 'Ninh Hòa',
	},
	{
		value: null,
		name: 'Phong Thạnh',
	},
	{
		value: null,
		name: 'Lương Sơn',
	},
	{
		value: null,
		name: 'Nha Trang',
	},
	{
		value: null,
		name: 'Cây Cầy',
	},
	{
		value: null,
		name: 'Hòa Tân',
	},
	{
		value: null,
		name: 'Suối Cát',
	},
	{
		value: null,
		name: 'Ngã Ba',
	},
	{
		value: null,
		name: 'Kà Rôm',
	},
	{
		value: null,
		name: 'Phước Nhơn',
	},
	{
		value: null,
		name: 'Tháp Chàm',
	},
	{
		value: null,
		name: 'Hòa Trinh',
	},
	{
		value: null,
		name: 'Cà Ná',
	},
	{
		value: null,
		name: 'Vĩnh Hảo',
	},
	{
		value: null,
		name: 'Sông Lòng Sông',
	},
	{
		value: null,
		name: 'Sông Mao',
	},
	{
		value: null,
		name: 'Châu Hanh',
	},
	{
		value: null,
		name: 'Sông Lũy',
	},
	{
		value: null,
		name: 'Long Thạnh',
	},
	{
		value: null,
		name: 'Ma Lâm',
	},
	{
		value: null,
		name: 'Phan Thiết',
	},
	{
		value: null,
		name: 'Bình Thuận',
	},
	{
		value: null,
		name: 'Suối Vận',
	},
	{
		value: null,
		name: 'Sông Phan',
	},
	{
		value: null,
		name: 'Sông Dinh',
	},
	{
		value: null,
		name: 'Suối Kiết',
	},
	{
		value: null,
		name: 'Gia Huynh',
	},
	{
		value: null,
		name: 'Trản Táo',
	},
	{
		value: null,
		name: 'Gia Ray',
	},
	{
		value: null,
		name: 'Bảo Chánh',
	},
	{
		value: null,
		name: 'Long Khánh',
	},
	{
		value: null,
		name: 'Dầu Giây',
	},
	{
		value: null,
		name: 'Trảng Bom',
	},
	{
		value: null,
		name: 'Hố Nai',
	},
	{
		value: null,
		name: 'Biên Hòa',
	},
	{
		value: null,
		name: 'Dĩ An',
	},
	{
		value: null,
		name: 'Sóng Thần',
	},
	{
		value: null,
		name: 'Bình Triệu',
	},
	{
		value: null,
		name: 'Gò Vấp',
	},
	{
		value: null,
		name: 'Sài Gòn',
	},
];

 ga_tau = ga_tau.map((cur,index)=>{
  return {
    ...cur,
    value: index + 1
  }
})

