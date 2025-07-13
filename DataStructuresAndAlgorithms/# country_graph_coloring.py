# country_graph_coloring.py
def can_color(graph, color, country, c):
    for neighbor in graph[country]:
        if color[neighbor] == c:
            return False
    return True

def graph_coloring_util(graph, m, color, country_list, index, color_names):
    if index == len(country_list):
        return True

    country = country_list[index]
    for c in range(m):
        if can_color(graph, color, country, c):
            color[country] = c
            if graph_coloring_util(graph, m, color, country_list, index + 1, color_names):
                return True
            color[country] = -1  

    return False

def graph_coloring(graph, m, color_names):
    country_list = list(graph.keys())
    color = {country: -1 for country in country_list}

    if graph_coloring_util(graph, m, color, country_list, 0, color_names):
        return {country: color_names[color[country]] for country in country_list}
    else:
        return "No solution exists"

if __name__ == "__main__":
    graph = {
        "France": ["Germany", "Italy", "Switzerland"],
        "Germany": ["France", "Switzerland"],
        "Italy": ["Spain", "France", "Greece"],
        "Greece": ["Spain"],
        "Spain": ["Italy", "Greece"],
        "Switzerland": ["France", "Germany"]
    }
    color_names = ["Red", "Blue", "Green", "Yellow", "Orange", "Purple", "Pink"]
    m = len(color_names)  

    result = graph_coloring(graph, m, color_names)
    print("Color assignment:", result)