from http.server import HTTPServer, BaseHTTPRequestHandler
import json

MODELS = [
    {"model_id": "priora", "name": "Lada Priora", "category": "Эконом", "price_min": 9, "price_hour": 500, "price_day": 10000, "plates": ["А101МР77", "В102МР77", "Е103МР190"]},
    {"model_id": "vaz-2107", "name": "ВАЗ 2107", "category": "Эконом", "price_min": 6, "price_hour": 300, "price_day": 7000, "plates": ["К207ТТ77", "М208ТТ190", "Н209ТТ777"]},
    {"model_id": "vaz-2114", "name": "ВАЗ 2114", "category": "Эконом", "price_min": 8, "price_hour": 400, "price_day": 11000, "plates": ["О214АА77", "Р215АА190", "С216АА777"]},
    {"model_id": "granta-sport", "name": "Lada Granta Sport", "category": "Эконом", "price_min": 9, "price_hour": 500, "price_day": 10000, "plates": ["Т301СП77", "У302СП190", "Х303СП777"]},
    {"model_id": "rapid", "name": "Skoda Rapid", "category": "Комфорт", "price_min": 12, "price_hour": 600, "price_day": 16000, "plates": ["А401КМ77", "В402КМ190", "Е403КМ777"]},
    {"model_id": "solaris", "name": "Hyundai Solaris", "category": "Комфорт", "price_min": 13, "price_hour": 700, "price_day": 18000, "plates": ["К411КМ77", "М412КМ190", "Н413КМ777"]},
    {"model_id": "haval-jolion", "name": "Haval Jolion", "category": "Комфорт", "price_min": 12, "price_hour": 600, "price_day": 16000, "plates": ["О421КМ77", "Р422КМ190", "С423КМ777"]},
    {"model_id": "omoda-c5", "name": "Omoda C5", "category": "Комфорт", "price_min": 12, "price_hour": 600, "price_day": 16000, "plates": ["Т431КМ77", "У432КМ190", "Х433КМ777"]},
    {"model_id": "geely-coolray", "name": "Geely Coolray", "category": "Комфорт", "price_min": 11, "price_hour": 550, "price_day": 15000, "plates": ["А441КМ77", "В442КМ190", "Е443КМ777"]},
    {"model_id": "audi-rs7", "name": "Audi RS7", "category": "Суприм", "price_min": 40, "price_hour": 2200, "price_day": 55000, "plates": ["А701СУ77", "В702СУ190", "Е703СУ777"]},
    {"model_id": "bmw-m8", "name": "BMW M8", "category": "Суприм", "price_min": 40, "price_hour": 2200, "price_day": 55000, "plates": ["К801СУ77", "М802СУ190", "Н803СУ777"]},
    {"model_id": "porsche-911-turbo-s", "name": "Porsche 911 Turbo S", "category": "Суприм", "price_min": 45, "price_hour": 2600, "price_day": 60000, "plates": ["О911СУ77", "Р912СУ190", "С913СУ777"]},
    {"model_id": "mercedes-e63-amg", "name": "Mercedes E63 AMG", "category": "Суприм", "price_min": 35, "price_hour": 2000, "price_day": 50000, "plates": ["Т631СУ77", "У632СУ190", "Х633СУ777"]},
]

CARS = []
cid = 1
for m in MODELS:
    for plate in m["plates"]:
        CARS.append({
            "id": cid,
            "model_id": m["model_id"],
            "plate": plate,
            "name": m["name"],
            "category": m["category"],
            "price_min": m["price_min"],
            "price_hour": m["price_hour"],
            "price_day": m["price_day"],
            "available": True,
        })
        cid += 1

BOOKINGS = []


class MellDriveHandler(BaseHTTPRequestHandler):
    def _set_cors(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")

    def _send_json(self, status_code: int, payload: dict | list):
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self._set_cors()
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_OPTIONS(self):
        self.send_response(204)
        self._set_cors()
        self.end_headers()

    def do_GET(self):
        if self.path == "/api/cars":
            self._send_json(200, {"total": len(CARS), "cars": CARS})
        elif self.path.startswith("/api/cars/plate/"):
            plate = self.path.split("/api/cars/plate/", 1)[1].strip().upper()
            car = next((c for c in CARS if c["plate"] == plate), None)
            if not car:
                self._send_json(404, {"error": "Автомобиль с таким госномером не найден"})
                return
            busy = any(b["plate"] == plate and b["status"] == "active" for b in BOOKINGS)
            self._send_json(200, {"car": car, "in_rent": busy})
        elif self.path == "/api/health":
            self._send_json(200, {"status": "ok", "fleet_size": len(CARS)})
        else:
            self._send_json(404, {"error": "Endpoint not found"})


if __name__ == "__main__":
    server = HTTPServer(("127.0.0.1", 8080), MellDriveHandler)
    print("MELLDRIVE API running on http://127.0.0.1:8080")
    server.serve_forever()
