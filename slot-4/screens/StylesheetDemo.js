// StylesheetDemo.js
import React, { useState, useMemo } from "react";
import { View, Text, StyleSheet, useColorScheme, TouchableOpacity } from "react-native";

/*
  Demo về Stylesheets trong React Native:
  - Inline styles (nhanh, dynamic)
  - StyleSheet.create (tái sử dụng, performance)
  - Themed styles (light/dark) + memoize style khi theme thay đổi
*/

/* ---------------------------
   Định nghĩa theme (constants)
   ---------------------------
   Đặt ở ngoài component để không recreate mỗi render.
   Theme chứa các giá trị màu/spacing mà styles sẽ phụ thuộc vào.
*/
const lightTheme = {
    background: "#fff",
    text: "#111",
    primary: "#1e90ff",
};
const darkTheme = {
    background: "#0f1115",
    text: "#fff",
    primary: "#4ea8ff",
};

/* -------------------------------------
   Hàm tạo StyleSheet dựa trên theme
   -------------------------------------
   Vì StyleSheet.create tạo ID để tối ưu, ta vẫn cần gọi nó.
   Tuy nhiên, khi style phụ thuộc vào theme, cần recreate khi theme thay đổi.
   Nên dùng useMemo ở component để chỉ recreate khi theme thay đổi.
*/
function createStyles(theme) {
    return StyleSheet.create({
        // Container chính của màn hình
        container: {
            flex: 1, // chiếm hết không gian sẵn có
            alignItems: "center", // căn giữa theo cross-axis
            justifyContent: "flex-start", // xếp từ trên xuống
            padding: 20,
            backgroundColor: theme.background, // lấy màu từ theme
        },

        // Tiêu đề chính
        header: {
            fontSize: 22,
            fontWeight: "700",
            color: theme.text, // text color theo theme
            marginBottom: 10,
        },

        // Một box dùng để demo (kích thước, radius, centered)
        box: {
            width: "100%",
            height: 60,
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 6,
        },

        // Nút (dùng StyleSheet nhưng màu nền được set bằng theme khi sử dụng)
        button: {
            marginTop: 10,
            padding: 12,
            borderRadius: 8,
            alignItems: "center",
            backgroundColor: theme.primary, // background lấy từ theme
        },

        // Text trong nút
        buttonText: {
            color: "#fff",
            fontWeight: "700",
        },
    });
}

/* ============================
   Component chính (export)
   ============================ */
export default function StylesheetDemo() {
    // Lấy theme hệ thống (light / dark / null)
    const system = useColorScheme();

    // State local để toggle theme demo 
    // Khởi tạo dựa trên theme hệ thống: nếu system === 'dark' thì isDark true
    const [isDark, setIsDark] = useState(system === "dark");

    // Chọn theme current dựa trên isDark
    const theme = isDark ? darkTheme : lightTheme;

    // Memoize styles: chỉ gọi createStyles lại khi `theme` thay đổi.
    // -> tránh recreate StyleSheet mỗi render (hiệu năng tốt hơn).
    const styles = useMemo(() => createStyles(theme), [theme]);

    return (
        <View style={styles.container}>
            {/* Header */}
            <Text style={styles.header}>1. Stylesheets Demo</Text>

            {/* ================= Inline styles =================
          Ví dụ dùng inline style object để override hoặc gán thuộc tính động.
          Lưu ý: nếu object inline phức tạp nên memoize bằng useMemo.
      */}
            <View
                style={[
                    styles.box,
                    // Inline override: đây là object mới mỗi render nếu không memoize.
                    { backgroundColor: isDark ? "#333" : "#ddd" }, // màu thay đổi theo isDark
                ]}
            >
                {/* Text dùng inline style (thích hợp cho text động nhỏ) */}
                <Text style={{ color: theme.text }}>Inline styles (quick & dynamic)</Text>
            </View>

            {/* ================= StyleSheet.create =================
          Ví dụ sử dụng StyleSheet.create + override màu bằng inline (hoặc by theme)
          StyleSheet giúp tối ưu (chuyển thành id) và dễ reuse.
      */}
            <View style={[styles.box, { backgroundColor: theme.primary }]}>
                {/* Đây là cách kết hợp StyleSheet + override inline */}
                <Text style={{ color: "#fff" }}>StyleSheet.create (reusable)</Text>
            </View>

            {/* ================= Themed styles =================
          Nút toggle theme: khi ấn thay đổi isDark -> theme thay đổi -> styles memoize sẽ recreate.
          Bạn có thể dùng Context/ThemeProvider nếu app lớn hơn.
      */}
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    // Hàm toggle đơn giản; nếu logic phức tạp hơn, dùng useCallback để memoize handler.
                    setIsDark((s) => !s);
                }}
            >
                <Text style={styles.buttonText}>
                    Toggle Theme (current: {isDark ? "Dark" : "Light"})
                </Text>
            </TouchableOpacity>
        </View>
    );
}
