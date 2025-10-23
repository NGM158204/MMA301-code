// FlexboxDemo.js
import React from "react";
import { View, Text, StyleSheet, useColorScheme, useWindowDimensions, ScrollView } from "react-native";

export default function FlexboxDemo() {
    // hook kiểm tra hệ thống light/dark mode
    const isDark = useColorScheme() === "dark";
    // hook lấy kích thước màn hình để làm responsive
    const { width } = useWindowDimensions();

    return (
        // dùng ScrollView để có thể cuộn khi có nhiều ví dụ
        <ScrollView
            style={{ flex: 1, backgroundColor: isDark ? "#0f1115" : "#fff" }}
            contentContainerStyle={{ padding: 20 }}
        >
            <Text style={[styles.header, { color: isDark ? "#fff" : "#111" }]}>
                2. Flexbox Demo (nhiều ví dụ)
            </Text>

            {/* ================= Row layout =================
          - flexDirection: "row" => các box xếp ngang
          - flex: 1 cho mỗi box => chia đều không gian (equal-width)
      */}
            <Text style={styles.section}>Row layout</Text>
            <View style={[styles.row]}>
                <View style={[styles.box, { backgroundColor: "#e67e22" }]} />
                <View style={[styles.box, { backgroundColor: "#27ae60" }]} />
                <View style={[styles.box, { backgroundColor: "#8e44ad" }]} />
            </View>

            {/* ================= Column layout =================
          - flexDirection: "column" => các box xếp dọc
      */}
            <Text style={styles.section}>Column layout</Text>
            <View style={styles.column}>
                <View style={[styles.smallBox, { backgroundColor: "#3498db" }]} />
                <View style={[styles.smallBox, { backgroundColor: "#e74c3c" }]} />
                <View style={[styles.smallBox, { backgroundColor: "#2ecc71" }]} />
            </View>

            {/* ================= justifyContent variations =================
          - minh họa các giá trị khác nhau của justifyContent
          - tác động theo "main axis" (ở đây là row = ngang)
      */}
            <Text style={styles.section}>justifyContent variations</Text>
            <View style={[styles.row, { justifyContent: "flex-start" }]}>
                <View style={[styles.box, { backgroundColor: "#e67e22" }]} />
                <View style={[styles.box, { backgroundColor: "#9b59b6" }]} />
                <View style={[styles.box, { backgroundColor: "#3498db" }]} />
            </View>
            <View style={[styles.row, { justifyContent: "space-between" }]}>
                <View style={[styles.box, { backgroundColor: "#3498db" }]} />
                <View style={[styles.box, { backgroundColor: "#27ae60" }]} />
                <View style={[styles.box, { backgroundColor: "#9b59b6" }]} />
            </View>
            <View style={[styles.row, { justifyContent: "space-around" }]}>
                <View style={[styles.box, { backgroundColor: "#1abc9c" }]} />
                <View style={[styles.box, { backgroundColor: "#f39c12" }]} />
                <View style={[styles.box, { backgroundColor: "#3498db" }]} />
            </View>
            <View style={[styles.row, { justifyContent: "space-evenly" }]}>
                <View style={[styles.box, { backgroundColor: "#2ecc71" }]} />
                <View style={[styles.box, { backgroundColor: "#e74c3c" }]} />
                <View style={[styles.box, { backgroundColor: "#f39c12" }]} />
            </View>

            {/* ================= alignItems variations =================
          - minh họa các giá trị khác nhau của alignItems
          - tác động theo "cross axis" (vuông góc với main axis)
      */}
            <Text style={styles.section}>alignItems variations</Text>
            <View style={[styles.alignExample, { alignItems: "flex-start" }]}>
                <View style={[styles.tallBox, { backgroundColor: "#3498db" }]} />
                <View style={[styles.smallBox, { backgroundColor: "#e74c3c" }]} />
            </View>
            <View style={[styles.alignExample, { alignItems: "center" }]}>
                <View style={[styles.tallBox, { backgroundColor: "#2ecc71" }]} />
                <View style={[styles.smallBox, { backgroundColor: "#f1c40f" }]} />
            </View>
            <View style={[styles.alignExample, { alignItems: "flex-end" }]}>
                <View style={[styles.tallBox, { backgroundColor: "#9b59b6" }]} />
                <View style={[styles.smallBox, { backgroundColor: "#e67e22" }]} />
            </View>
            {/* baseline: căn chữ theo đường baseline, chứ không phải theo kích thước box */}
            <View style={[styles.alignExample, { alignItems: "baseline" }]}>
                <Text style={{ fontSize: 30, backgroundColor: "#1abc9c" }}>Big</Text>
                <Text style={{ fontSize: 16, backgroundColor: "#f39c12" }}>Small</Text>
            </View>

            {/* ================= flex ratio =================
          - flex xác định tỉ lệ chia không gian
          - flex: 1,2,3 => box chiếm diện tích theo tỉ lệ 1:2:3
      */}
            <Text style={styles.section}>flex ratio</Text>
            <View style={styles.row}>
                <View style={{ flex: 1, height: 50, backgroundColor: "#3498db" }} />
                <View style={{ flex: 2, height: 50, backgroundColor: "#e74c3c" }} />
                <View style={{ flex: 3, height: 50, backgroundColor: "#2ecc71" }} />
            </View>

            {/* ================= flexWrap example =================
          - khi nhiều box vượt quá chiều ngang => tự động xuống dòng
      */}
            <Text style={styles.section}>flexWrap: "wrap"</Text>
            <View style={styles.wrapContainer}>
                {Array.from({ length: 10 }).map((_, i) => (
                    <View
                        key={i}
                        style={{
                            width: 80,
                            height: 50,
                            margin: 4,
                            borderRadius: 6,
                            backgroundColor: i % 2 === 0 ? "#9b59b6" : "#f1c40f",
                        }}
                    />
                ))}
            </View>

            {/* ================= Responsive layout =================
          - Box chiếm 80% chiều rộng màn hình hiện tại
          - khi rotate màn hình, width tự động thay đổi
      */}
            <Text style={styles.section}>Responsive box (80% screen width)</Text>
            <View style={[styles.responsiveBox, { width: width * 0.8 }]}>
                <Text style={{ color: "#fff" }}>Box width = 80% of screen</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    header: { fontSize: 22, fontWeight: "700", marginBottom: 10 },
    section: { alignSelf: "flex-start", fontWeight: "600", marginVertical: 8 },

    // ====== Row demo ======
    row: {
        flexDirection: "row",      // xếp ngang
        alignItems: "center",      // căn giữa theo trục dọc
        width: "100%",
        marginVertical: 8,
    },
    box: {
        width: 160,
        height: 60,
        marginHorizontal: 5,
        borderRadius: 8
    },

    // ====== Column demo ======
    column: {
        flexDirection: "column",   // xếp dọc
        alignItems: "center",      // căn giữa theo trục ngang
        width: "100%",
        marginVertical: 8,
    },

    // ====== Align demo ======
    alignExample: {
        flexDirection: "row",
        justifyContent: "space-around", // phân bố đều theo ngang
        backgroundColor: "#ecf0f1",
        borderRadius: 8,
        marginVertical: 8,
        height: 100,
    },
    tallBox: { width: 60, height: 80, borderRadius: 6 },
    smallBox: { width: 60, height: 40, borderRadius: 6 },

    // ====== flexWrap demo ======
    wrapContainer: {
        flexDirection: "row",
        flexWrap: "wrap",  // cho phép xuống dòng
        backgroundColor: "#ecf0f1",
        borderRadius: 8,
        marginVertical: 8,
        padding: 8,
    },

    // ====== Responsive demo ======
    responsiveBox: {
        height: 100,
        borderRadius: 8,
        backgroundColor: "#34495e",
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 8,
    },
});
