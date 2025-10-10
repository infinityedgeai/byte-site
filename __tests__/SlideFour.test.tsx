import { render, screen, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import SlideFour from "../src/components/SlideFour";

jest.mock("react-leaflet", () => ({
  MapContainer: ({ children }: any) => (
    <div data-testid="mocked-map">{children}</div>
  ),
  TileLayer: () => <div data-testid="mocked-tilelayer" />,
  Marker: ({ children, position }: any) => (
    <div data-testid="mocked-marker" data-pos={position}>
      {children}
    </div>
  ),
  Popup: ({ children }: any) => (
    <div data-testid="mocked-popup">{children}</div>
  ),
}));

beforeEach(() => {
  const coordsToCountry: Record<string, string> = {
    "51.505,-0.09": "United Kingdom",
    "40.505,-0.09": "Spain",
    "30.505,-0.09": "Algeria",
    "20.505,-0.09": "Mali",
  };

  global.fetch = jest.fn((url: RequestInfo) => {
    const query = new URL(url.toString());
    const lat = query.searchParams.get("lat");
    const lon = query.searchParams.get("lon");
    const key = `${lat},${lon}`;

    const country = coordsToCountry[key] ?? "Unknown";

    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ address: { country } }),
    }) as any;
  }) as jest.Mock;
});

afterEach(() => {
  jest.resetAllMocks();
});

describe("SlideFour Component", () => {
  it("renders the map container", async () => {
    await act(async () => {
      render(<SlideFour />);
    });

    await waitFor(() => {
      expect(screen.getByTestId("mocked-map")).toBeInTheDocument();
    }, { timeout: 5000 });
  });

  it("renders markers and popups with correct countries", async () => {
    await act(async () => {
      render(<SlideFour />);
    });

    await waitFor(() => {
      const markers = screen.getAllByTestId("mocked-marker");
      expect(markers.length).toBe(4);

      expect(screen.getByText(/Country: United Kingdom/i)).toBeInTheDocument();
      expect(screen.getByText(/Country: Spain/i)).toBeInTheDocument();
      expect(screen.getByText(/Country: Algeria/i)).toBeInTheDocument();
      expect(screen.getByText(/Country: Mali/i)).toBeInTheDocument();
    }, { timeout: 10000 });
  });
});
