document.addEventListener("DOMContentLoaded", function () {
    var geocoder = new GoongGeocoder({
        accessToken: 'HXYJmevRtYVjzkjkEobCLVr86Cd5mQzHq8YagNQU'
    });
    geocoder.addTo('#geocoder');
    setTimeout(() => {
        document.querySelector(".mapboxgl-ctrl-geocoder--input").setAttribute("placeholder", "Nhập địa chỉ của bạn...");
    }, 500);
    // 🟢 Lấy địa chỉ ban đầu từ input hidden
    let initialAddress = document.getElementById("userAddress").value;

    // 🟢 Chờ Geocoder hiển thị xong rồi mới đặt giá trị
    const observer = new MutationObserver(() => {
        let inputBox = document.querySelector(".mapboxgl-ctrl-geocoder--input");
        if (inputBox && initialAddress) {
            inputBox.value = initialAddress;
            observer.disconnect(); // Dừng theo dõi sau khi đã đặt giá trị
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Khi chọn địa chỉ mới
    geocoder.on('result', function (e) {
        console.log("Kết quả từ Goong API:", e);

        let data = e.result.result || e.result;
        if (!data || !data.formatted_address || !data.compound) {
            console.error("Không nhận được địa chỉ hợp lệ!");
            return;
        }

        // 🟢 Lấy địa chỉ từ API Goong
        const street = data.name || "";
        const ward = data.compound.commune || "";
        const district = data.compound.district || "";
        const city = data.compound.province || "";

        // 🟢 Cập nhật các ô nhập liệu
        document.getElementById("street").value = street;
        document.getElementById("ward").value = ward;
        document.getElementById("district").value = district;
        document.getElementById("city").value = city;
    });

    // Khi xóa địa chỉ
    geocoder.on('clear', function () {
        console.log("Địa chỉ đã bị xóa");
        document.getElementById("street").value = "";
        document.getElementById("ward").value = "";
        document.getElementById("district").value = "";
        document.getElementById("city").value = "";
    });
});