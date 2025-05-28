package com.example.model;

import java.util.Objects;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.v3.oas.annotations.media.Schema;
import java.math.BigDecimal;
import java.time.LocalDate;
import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * RequestArtystaDzielo
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2025-04-01T20:32:28.347647700+02:00[Europe/Warsaw]")


public class RequestArtystaDzielo   {
  @JsonProperty("title")
  private String title = null;

  @JsonProperty("dimensions")
  private String dimensions = null;

  @JsonProperty("price")
  private BigDecimal price = null;

  @JsonProperty("category")
  private String category = null;

  @JsonProperty("medium")
  private String medium = null;

  @JsonProperty("style")
  private String style = null;

  @JsonProperty("date")
  private LocalDate date = null;

  @JsonProperty("description")
  private String description = null;

  public RequestArtystaDzielo title(String title) {
    this.title = title;
    return this;
  }

  /**
   * Get title
   * @return title
   **/
  @Schema(example = "Pejzaż górski", required = true, description = "")
      @NotNull

    public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public RequestArtystaDzielo dimensions(String dimensions) {
    this.dimensions = dimensions;
    return this;
  }

  /**
   * Get dimensions
   * @return dimensions
   **/
  @Schema(example = "100x150 cm", required = true, description = "")
      @NotNull

    public String getDimensions() {
    return dimensions;
  }

  public void setDimensions(String dimensions) {
    this.dimensions = dimensions;
  }

  public RequestArtystaDzielo price(BigDecimal price) {
    this.price = price;
    return this;
  }

  /**
   * Get price
   * @return price
   **/
  @Schema(example = "1200", required = true, description = "")
      @NotNull

    @Valid
    public BigDecimal getPrice() {
    return price;
  }

  public void setPrice(BigDecimal price) {
    this.price = price;
  }

  public RequestArtystaDzielo category(String category) {
    this.category = category;
    return this;
  }

  /**
   * Get category
   * @return category
   **/
  @Schema(example = "Malarstwo", required = true, description = "")
      @NotNull

    public String getCategory() {
    return category;
  }

  public void setCategory(String category) {
    this.category = category;
  }

  public RequestArtystaDzielo medium(String medium) {
    this.medium = medium;
    return this;
  }

  /**
   * Get medium
   * @return medium
   **/
  @Schema(example = "Olej na płótnie", required = true, description = "")
      @NotNull

    public String getMedium() {
    return medium;
  }

  public void setMedium(String medium) {
    this.medium = medium;
  }

  public RequestArtystaDzielo style(String style) {
    this.style = style;
    return this;
  }

  /**
   * Get style
   * @return style
   **/
  @Schema(example = "Realizm", required = true, description = "")
      @NotNull

    public String getStyle() {
    return style;
  }

  public void setStyle(String style) {
    this.style = style;
  }

  public RequestArtystaDzielo date(LocalDate date) {
    this.date = date;
    return this;
  }

  /**
   * Get date
   * @return date
   **/
  @Schema(example = "Mon Jan 15 01:00:00 CET 2024", required = true, description = "")
      @NotNull

    @Valid
    public LocalDate getDate() {
    return date;
  }

  public void setDate(LocalDate date) {
    this.date = date;
  }

  public RequestArtystaDzielo description(String description) {
    this.description = description;
    return this;
  }

  /**
   * Get description
   * @return description
   **/
  @Schema(example = "Pejzaż przedstawiający góry o zachodzie słońca.", required = true, description = "")
      @NotNull

    public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    RequestArtystaDzielo requestArtystaDzielo = (RequestArtystaDzielo) o;
    return Objects.equals(this.title, requestArtystaDzielo.title) &&
        Objects.equals(this.dimensions, requestArtystaDzielo.dimensions) &&
        Objects.equals(this.price, requestArtystaDzielo.price) &&
        Objects.equals(this.category, requestArtystaDzielo.category) &&
        Objects.equals(this.medium, requestArtystaDzielo.medium) &&
        Objects.equals(this.style, requestArtystaDzielo.style) &&
        Objects.equals(this.date, requestArtystaDzielo.date) &&
        Objects.equals(this.description, requestArtystaDzielo.description);
  }

  @Override
  public int hashCode() {
    return Objects.hash(title, dimensions, price, category, medium, style, date, description);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class RequestArtystaDzielo {\n");
    
    sb.append("    title: ").append(toIndentedString(title)).append("\n");
    sb.append("    dimensions: ").append(toIndentedString(dimensions)).append("\n");
    sb.append("    price: ").append(toIndentedString(price)).append("\n");
    sb.append("    category: ").append(toIndentedString(category)).append("\n");
    sb.append("    medium: ").append(toIndentedString(medium)).append("\n");
    sb.append("    style: ").append(toIndentedString(style)).append("\n");
    sb.append("    date: ").append(toIndentedString(date)).append("\n");
    sb.append("    description: ").append(toIndentedString(description)).append("\n");
    sb.append("}");
    return sb.toString();
  }

  /**
   * Convert the given object to string with each line indented by 4 spaces
   * (except the first line).
   */
  private String toIndentedString(java.lang.Object o) {
    if (o == null) {
      return "null";
    }
    return o.toString().replace("\n", "\n    ");
  }
}
