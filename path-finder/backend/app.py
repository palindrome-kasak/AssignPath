from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

# Define the endpoint for finding the shortest path
@app.route("/find-path", methods=["POST"])
def find_path():
    try:
        # Extract the start and end points from the request
        data = request.json
        start = data.get("start")  # Expected format: [x1, y1]
        end = data.get("end")  # Expected format: [x2, y2]

        if not start or not end:
            return jsonify({"error": "Invalid start or end coordinates"}), 400

        # Perform the DFS algorithm to calculate the shortest path
        path = dfs_shortest_path(start, end)

        # Return the calculated path as a list of coordinates
        return jsonify({"path": path}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

def dfs_shortest_path(start, end):
    # Placeholder implementation of the DFS algorithm
    grid_size = 20  # 20x20 grid
    visited = set()
    path = []

    def dfs(current, target):
        if current == target:
            path.append(current)
            return True
        x, y = current
        if current in visited or x < 0 or x >= grid_size or y < 0 or y >= grid_size:
            return False

        visited.add(current)
        neighbors = [(x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)]  # Adjacent cells
        for neighbor in neighbors:
            if dfs(neighbor, target):
                path.append(current)
                return True
        return False

    if dfs(tuple(start), tuple(end)):
        path.reverse()  # Reverse the path since DFS adds nodes from end to start
        return path
    return []  # Return an empty list if no path is found

# Add a simple test route
@app.route("/", methods=["GET"])
def home():
    return "Backend is running!"

if __name__ == "__main__":
    app.run(debug=True)
