from http.server import HTTPServer, BaseHTTPRequestHandler
import json

CARS = [
    {"id": 1, "name": "Hyundai Solaris", "category": "Эконом", "price_min": 11.5, "price_day": 2400, "available": True},
    {"id": 2, "name": "Haval Jolion 4WD", "category": "Комфорт", "price_min": 15.5, "price_day": 3500, "available": True},
    {"id": 3, "name": "Tesla Model 3", "category": "Электро", "price_min": 25.0, "price_day": 6900, "available": True},
    {"id": 4, "name": "BMW M5 Competition", "category": "Спорт", "price_min": 55.0, "price_day": 39000, "available": True},
]

BOOKINGS = []


class MellDriveHandler(BaseHTTPRequestHandler):
    def _send_json(self, status_code: int, payload: dict | list):
        body = json.dumps(payload, ensure_ascii=False).encode("utf-8")
        self.send_response(status_code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        if self.path == "/api/cars":
            self._send_json(200, {"cars": CARS})
        elif self.path == "/api/bookings":
            self._send_json(200, {"bookings": BOOKINGS})
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

        if self.path == "/api/bookings":
            car_id = data.get("car_id")
            car = next((c for c in CARS if c["id"] == car_id), None)
            if not car:
                self._send_json(404, {"error": "Car not found"})
                return
            booking = {
                "id": f"MD-{100100 + len(BOOKINGS)}",
                "car_id": car_id,
                "car_name": car["name"],
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
