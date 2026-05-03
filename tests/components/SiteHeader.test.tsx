import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SiteHeader } from "../../src/components/SiteHeader";
import {
  navigationGroups,
  primaryNavigation,
} from "../../src/content/siteContent";

describe("SiteHeader", () => {
  it("opens a desktop dropdown on click and closes on Escape", async () => {
    render(
      <SiteHeader
        primaryNavigation={primaryNavigation}
        navigationGroups={navigationGroups}
      />,
    );

    const servicesButton = screen.getByRole("button", { name: /^services$/i });
    expect(servicesButton.getAttribute("aria-expanded")).toBe("false");

    fireEvent.click(servicesButton);
    expect(servicesButton.getAttribute("aria-expanded")).toBe("true");
    expect(
      screen.getByRole("link", { name: /services overview/i }),
    ).toBeVisible();

    fireEvent.keyDown(document, { key: "Escape" });

    await waitFor(() =>
      expect(
        screen.queryByRole("link", { name: /services overview/i }),
      ).not.toBeInTheDocument(),
    );
    expect(servicesButton.getAttribute("aria-expanded")).toBe("false");
  });

  it("closes an open dropdown on outside click", async () => {
    render(
      <>
        <SiteHeader
          primaryNavigation={primaryNavigation}
          navigationGroups={navigationGroups}
        />
        <button type="button">outside control</button>
      </>,
    );

    fireEvent.click(screen.getByRole("button", { name: /^services$/i }));
    expect(
      screen.getByRole("link", { name: /services overview/i }),
    ).toBeVisible();

    fireEvent.mouseDown(screen.getByRole("button", { name: /outside control/i }));

    await waitFor(() =>
      expect(
        screen.queryByRole("link", { name: /services overview/i }),
      ).not.toBeInTheDocument(),
    );
  });

  it("toggles the mobile menu", async () => {
    render(
      <SiteHeader
        primaryNavigation={primaryNavigation}
        navigationGroups={navigationGroups}
      />,
    );

    const openButton = screen.getByRole("button", {
      name: /open navigation/i,
    });
    fireEvent.click(openButton);

    expect(
      screen.getByRole("navigation", { name: /mobile/i }),
    ).toBeVisible();

    fireEvent.click(
      screen.getByRole("button", { name: /close navigation/i }),
    );

    await waitFor(() =>
      expect(screen.queryByRole("navigation", { name: /mobile/i })).toBeNull(),
    );
  });
});
