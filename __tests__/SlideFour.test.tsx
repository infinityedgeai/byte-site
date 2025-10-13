import { render, screen, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import SlideFour from "../src/components/SlideFour";
import teamData from "../src/data/team.json";

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

  it("renders markers with team member tooltips", async () => {
    await act(async () => {
      render(<SlideFour />);
    });

    await waitFor(() => {
      for (let i = 0; i < teamData.length; i++) {
        expect(screen.getByTestId(`marker-${i}`)).toBeInTheDocument();
      }
    }, { timeout: 5000 });

    const tooltips = screen.getAllByTestId("mocked-tooltip");
    expect(tooltips.length).toBe(teamData.length);

    teamData.forEach((member, index) => {
      const tooltip = screen.getByTestId(`tooltip-${index}`);
      expect(tooltip).toHaveTextContent(member.name);
      expect(tooltip).toHaveTextContent(member.role);
      expect(tooltip).toHaveTextContent(member.location);
    });
  });
});
