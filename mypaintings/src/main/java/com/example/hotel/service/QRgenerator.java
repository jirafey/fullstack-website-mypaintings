package com.example.hotel.service;
import java.io.*;

public class QRgenerator {
    public static void generateQR(String link, String imageId) {
        try {
            // Ścieżka do Pythona i skryptu
            String pythonExe = "python3"; // lub "python" w zależności od systemu
            String scriptPath = "generate_qr.py";

            ProcessBuilder pb = new ProcessBuilder(
                    pythonExe, scriptPath, link, imageId
            );

            pb.redirectErrorStream(true);
            Process process = pb.start();

            // Odczyt wyjścia skryptu Pythona (opcjonalnie)
            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }

            int exitCode = process.waitFor();
            if (exitCode == 0) {
                System.out.println("Kod QR wygenerowany pomyślnie jako " + imageId + ".png");
            } else {
                System.err.println("Błąd podczas generowania kodu QR.");
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // Przykład użycia
    public static void main(String[] args) {
        generateQR("https://example.com", "qr_image_123");
    }
}
