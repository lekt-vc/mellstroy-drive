from http.server import HTTPServer, BaseHTTPRequestHandler
import json

ZONES = [
    {
        "id": "center",
        "region": "moscow",
        "title": "Центр и ТТК",
        "parking": "Бесплатно на платных парковках города",
        "cars": [
            {"id": 101, "name": "Hyundai Solaris", "category": "Эконом", "price_min": 11.5, "price_day": 2400, "available": True},
            {"id": 102, "name": "Mercedes-Maybach S 580", "category": "Бизнес", "price_min": 75.0, "price_day": 55000, "available": True},
            {"id": 103, "name": "Porsche 911 Turbo S", "category": "Спорт", "price_min": 90.0, "price_day": 72000, "available": True},
        ],
    },
    {
        "id": "north",
        "region": "moscow",
        "title": "Север и ВДНХ",
        "parking": "Разрешено в зелёной зоне",
        "cars": [
            {"id": 201, "name": "Haval Jolion 4WD", "category": "Комфорт", "price_min": 15.5, "price_day": 3500, "available": True},
            {"id": 202, "name": "Tesla Model 3", "category": "Электро", "price_min": 25.0, "price_day": 6900, "available": True},
        ],
    },
    {
        "id": "korolev",
        "region": "mo",
        "title": "Королёв и Мытищи",
        "parking": "Разрешено в границах зоны МО",
        "cars": [
            {"id": 401, "name": "Hyundai Solaris", "category": "Эконом", "price_min": 11.5, "price_day": 2400, "available": True},
            {"id": 402, "name": "Haval Jolion 4WD", "category": "Комфорт", "price_min": 15.5, "price_day": 3500, "available": True},
        ],
    },
]

CARS = [
    {"id": 1, "name": "Hyundai Solaris", "category": "Эконом", "price_min": 11.5, "price_day": 2400, "available": True},
    {"id": 2, "name": "Haval Jolion 4WD", "category": "Комфорт", "price_min": 15.5, "price_day": 3500, "available": True},
    {"id": 3, "name": "Tesla Model 3", "category": "Электро", "price_min": 25.0, "price_day": 6900, "available": True},
    {"id": 4, "name": "BMW M5 Competition", "category": "Спорт", "price_min": 55.0, "price_day": 39000, "available": True},
] + [car for z in ZONES for car in z["cars"]]

USERS = [
    {"id": 1, "email": "admin@melldrive.ru", "name": "Водитель (lekt-vc)", "role": "admin", "age": 19}
]

BOOKINGS = []


class MellDriveHandler(BaseHTTPRequestHandler):
    def _set_cors(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, PATCH, OPTIONS")
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
            self._send_json(200, {"cars": CARS})
        elif self.path == "/api/zones":
            self._send_json(200, {"zones": ZONES})
        elif self.path == "/api/bookings":
            self._send_json(200, {"bookings": BOOKINGS})
        elif self.path == "/api/health":
            self._send_json(200, {"status": "ok", "service": "MELLDRIVE API"})
        else:
            self._send_json(404, {"error": "Endpoint not found"})

    def do_POST(self):
        length = int(self.headers.get("Content-Length", 0))
        raw = self.rfile.read(length) if length else b"{}"
        try:
            data = json.loads(raw.decode("utf-8"))
        except json.JSONDecodeError:
            self._send_json(400, {"error": "Invalid JSON"})
            return

        if self.path == "/api/auth/register":
            try:
                age = int(data.get("age", 0))
            except (TypeError, ValueError):
                self._send_json(400, {"error": "Некорректный формат возраста"})
                return
            if age < 18:
                self._send_json(400, {"error": "Регистрация доступна только с 18 лет (BUG-001)"})
                return
            user = {
                "id": len(USERS) + 1,
                "email": data.get("email", ""),
                "name": data.get("name", "Водитель"),
                "role": "user",
                "age": age,
            }
            USERS.append(user)
            self._send_json(201, {"user": user})

        elif self.path == "/api/auth/login":
            email = data.get("email", "")
            user = next((u for u in USERS if u["email"] == email), None)
            if not user:
                self._send_json(401, {"error": "Пользователь не найден"})
                return
            self._send_json(200, {"user": user, "token": f"token-{user['id']}"})

        elif self.path == "/api/bookings":
            car_id = data.get("car_id")
            car = next((c for c in CARS if c["id"] == car_id), None)
            if not car:
                self._send_json(404, {"error": "Автомобиль не найден"})
                return
            already_active = any(b["car_id"] == car_id and b["status"] == "active" for b in BOOKINGS)
            if already_active:
                self._send_json(409, {"error": "Автомобиль уже забронирован другим водителем"})
                return
            booking = {
                "id": f"MD-{100100 + len(BOOKINGS)}",
                "car_id": car_id,
                "car_name": car["name"],
                "zone_id": data.get("zone_id", "center"),
                "tariff": data.get("tariff", "minute"),
                "status": "active",
            }
            BOOKINGS.append(booking)
            self._send_json(201, {"booking": booking})
        else:
            self._send_json(404, {"error": "Endpoint not found"})


if __name__ == "__main__":
    server = HTTPServer(("127.0.0.1", 8080), MellDriveHandler)
    print("MELLDRIVE API running on http://127.0.0.1:8080")
    server.serve_forever()

