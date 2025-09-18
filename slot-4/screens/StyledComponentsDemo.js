// StyledComponentsDemo.js
import React, { useState } from "react";
import { Text, Alert } from "react-native";
import styled, { ThemeProvider } from "styled-components/native";

// import mixins từ file globalStyles.js
// shadowEffect: tạo đổ bóng
// flexCenter: căn giữa nội dung
import { shadowEffect, flexCenter } from "../globalStyles";

// =======================
// Định nghĩa theme (light / dark)
// Theme có thể chứa nhiều giá trị như colors, spacing, fontSizes...
// =======================
const lightTheme = {
    background: "#fff",
    text: "#111",
    primary: "#1e90ff",
    card: "#f6f9ff",
};
const darkTheme = {
    background: "#0f1115",
    text: "#fff",
    primary: "#4ea8ff",
    card: "#1a1f2b",
};

// =======================
// styled-components definitions
// =======================

// Container chính, nhận background từ theme
const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: ${(p) => p.theme.background};
`;

// Nút bấm styled, có dynamic props:
// - Nếu có prop "primary" => background dùng theme.primary
// - Ngược lại => màu đỏ (#e74c3c)
const StyledButton = styled.TouchableOpacity`
  padding-vertical: 12px;
  padding-horizontal: 16px;
  border-radius: 8px;
  margin-vertical: 8px;
  background-color: ${(p) => (p.primary ? p.theme.primary : "#e74c3c")};
  align-items: center;
`;

// Text trong button
const ButtonText = styled.Text`
  color: white;
  font-weight: 700;
`;

// Card styled, kết hợp mixins (shadow + center)
const Card = styled.View`
  ${shadowEffect}
  ${flexCenter}
  background-color: ${(p) => p.theme.card};
  border-radius: 12px;
  padding: 16px;
  margin-vertical: 10px;
`;

export default function StyledComponentsDemo() {
    // State để toggle theme
    const [isDark, setIsDark] = useState(false);
    const theme = isDark ? darkTheme : lightTheme;

    return (
        // ThemeProvider: cung cấp theme cho toàn bộ styled-components bên trong
        <ThemeProvider theme={theme}>
            <Container>
                {/* Tiêu đề */}
                <Text
                    style={{
                        fontSize: 22,
                        fontWeight: "700",
                        marginBottom: 10,
                        color: theme.text, // dùng màu text từ theme
                    }}
                >
                    3. Styled-Components Demo
                </Text>

                {/* ========== Buttons ========== */}
                {/* Button primary (màu từ theme.primary) */}
                <StyledButton primary onPress={() => setIsDark((s) => !s)}>
                    <ButtonText>Toggle Theme</ButtonText>
                </StyledButton>

                {/* Button secondary (màu đỏ mặc định) */}
                <StyledButton onPress={() => Alert.alert("Cancel", "You pressed Cancel")}>
                    <ButtonText>Cancel</ButtonText>
                </StyledButton>

                {/* ========== Card + mixins ========== */}
                {/* Card này dùng mixin shadowEffect (tạo bóng) + flexCenter (căn giữa) */}
                <Card>
                    <Text style={{ color: theme.text }}>
                        Card with shadowEffect + flexCenter mixins
                    </Text>
                </Card>

                {/* ========== Demo thêm: button size dynamic ========== */}
                <StyledButton
                    primary
                    style={{ paddingHorizontal: 32 }} // override thêm inline
                    onPress={() => Alert.alert("Info", "This is a larger button!")}
                >
                    <ButtonText>Bigger Button (inline override)</ButtonText>
                </StyledButton>
            </Container>
        </ThemeProvider>
    );
}
