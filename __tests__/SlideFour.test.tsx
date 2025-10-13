import { render, screen, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import SlideFour from "../src/components/SlideFour";

jest.mock("react-leaflet", () => ({
  MapContainer: ({ children }: any) => (
    <div data-testid="mocked-map">{children}</div>
  ),
  TileLayer: () => <div data-testid="mocked-tilelayer" />,
  Marker: ({ children, position, ...props }: any) => (
    <div 
      data-testid="mocked-marker" 
      data-pos={position}
      {...props}
    >
      {children}
    </div>
  ),
  Tooltip: ({ children }: any) => (
    <div data-testid="mocked-tooltip">{children}</div>
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
  jest.setTimeout(20000);
  it("renders the map container", async () => {
    await act(async () => {
      render(<SlideFour />);
    });

    await waitFor(() => {
      expect(screen.getByTestId("mocked-map")).toBeInTheDocument();
    }, { timeout: 5000 });
  });

  it("renders markers with tooltips", async () => {
    await act(async () => {
      render(<SlideFour />);
    });

    // Wait for markers to be rendered using individual marker testids
    await waitFor(() => {
      expect(screen.getByTestId("marker-0")).toBeInTheDocument();
      expect(screen.getByTestId("marker-1")).toBeInTheDocument();
      expect(screen.getByTestId("marker-2")).toBeInTheDocument();
      expect(screen.getByTestId("marker-3")).toBeInTheDocument();
    }, { timeout: 5000 });

    // Check that tooltips are present with correct content
    const tooltips = screen.getAllByTestId("mocked-tooltip");
    expect(tooltips.length).toBe(4);
    
    // Check that each tooltip has the correct country information
    expect(screen.getByTestId("tooltip-0")).toHaveTextContent("Country: United Kingdom");
    expect(screen.getByTestId("tooltip-1")).toHaveTextContent("Country: Spain");
    expect(screen.getByTestId("tooltip-2")).toHaveTextContent("Country: Algeria");
    expect(screen.getByTestId("tooltip-3")).toHaveTextContent("Country: Mali");
  });
});
