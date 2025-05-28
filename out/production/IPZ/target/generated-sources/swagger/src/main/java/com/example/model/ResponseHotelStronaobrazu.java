package com.example.model;

import java.util.Objects;
import com.example.model.ResponseHotelStronaobrazuImages;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonCreator;
import io.swagger.v3.oas.annotations.media.Schema;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import org.springframework.validation.annotation.Validated;
import javax.validation.Valid;
import javax.validation.constraints.*;

/**
 * ResponseHotelStronaobrazu
 */
@Validated
@javax.annotation.Generated(value = "io.swagger.codegen.v3.generators.java.SpringCodegen", date = "2025-04-01T20:32:28.347647700+02:00[Europe/Warsaw]")


public class ResponseHotelStronaobrazu   {
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

  @JsonProperty("artist_id")
  private Integer artistId = null;

  @JsonProperty("artist_nick")
  private String artistNick = null;

  @JsonProperty("artist_avatar_url")
  private String artistAvatarUrl = null;

  @JsonProperty("images")
  @Valid
  private List<ResponseHotelStronaobrazuImages> images = null;

  public ResponseHotelStronaobrazu title(String title) {
    this.title = title;
    return this;
  }

  /**
   * Get title
   * @return title
   **/
  @Schema(example = "Pejzaż górski", description = "")
  
    public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public ResponseHotelStronaobrazu dimensions(String dimensions) {
    this.dimensions = dimensions;
    return this;
  }

  /**
   * Get dimensions
   * @return dimensions
   **/
  @Schema(example = "100x150 cm", description = "")
  
    public String getDimensions() {
    return dimensions;
  }

  public void setDimensions(String dimensions) {
    this.dimensions = dimensions;
  }

  public ResponseHotelStronaobrazu price(BigDecimal price) {
    this.price = price;
    return this;
  }

  /**
   * Get price
   * @return price
   **/
  @Schema(example = "1200", description = "")
  
    @Valid
    public BigDecimal getPrice() {
    return price;
  }

  public void setPrice(BigDecimal price) {
    this.price = price;
  }

  public ResponseHotelStronaobrazu category(String category) {
    this.category = category;
    return this;
  }

  /**
   * Get category
   * @return category
   **/
  @Schema(example = "Malarstwo", description = "")
  
    public String getCategory() {
    return category;
  }

  public void setCategory(String category) {
    this.category = category;
  }

  public ResponseHotelStronaobrazu medium(String medium) {
    this.medium = medium;
    return this;
  }

  /**
   * Get medium
   * @return medium
   **/
  @Schema(example = "Olej na płótnie", description = "")
  
    public String getMedium() {
    return medium;
  }

  public void setMedium(String medium) {
    this.medium = medium;
  }

  public ResponseHotelStronaobrazu style(String style) {
    this.style = style;
    return this;
  }

  /**
   * Get style
   * @return style
   **/
  @Schema(example = "Realizm", description = "")
  
    public String getStyle() {
    return style;
  }

  public void setStyle(String style) {
    this.style = style;
  }

  public ResponseHotelStronaobrazu date(LocalDate date) {
    this.date = date;
    return this;
  }

  /**
   * Get date
   * @return date
   **/
  @Schema(example = "Mon Jan 15 01:00:00 CET 2024", description = "")
  
    @Valid
    public LocalDate getDate() {
    return date;
  }

  public void setDate(LocalDate date) {
    this.date = date;
  }

  public ResponseHotelStronaobrazu description(String description) {
    this.description = description;
    return this;
  }

  /**
   * Get description
   * @return description
   **/
  @Schema(example = "Pejzaż przedstawiający góry o zachodzie słońca.", description = "")
  
    public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public ResponseHotelStronaobrazu artistId(Integer artistId) {
    this.artistId = artistId;
    return this;
  }

  /**
   * Get artistId
   * @return artistId
   **/
  @Schema(example = "456", description = "")
  
    public Integer getArtistId() {
    return artistId;
  }

  public void setArtistId(Integer artistId) {
    this.artistId = artistId;
  }

  public ResponseHotelStronaobrazu artistNick(String artistNick) {
    this.artistNick = artistNick;
    return this;
  }

  /**
   * Get artistNick
   * @return artistNick
   **/
  @Schema(example = "@jan_kowalski", description = "")
  
    public String getArtistNick() {
    return artistNick;
  }

  public void setArtistNick(String artistNick) {
    this.artistNick = artistNick;
  }

  public ResponseHotelStronaobrazu artistAvatarUrl(String artistAvatarUrl) {
    this.artistAvatarUrl = artistAvatarUrl;
    return this;
  }

  /**
   * Get artistAvatarUrl
   * @return artistAvatarUrl
   **/
  @Schema(example = "https://example.com/avatars/jan_kowalski.png", description = "")
  
    public String getArtistAvatarUrl() {
    return artistAvatarUrl;
  }

  public void setArtistAvatarUrl(String artistAvatarUrl) {
    this.artistAvatarUrl = artistAvatarUrl;
  }

  public ResponseHotelStronaobrazu images(List<ResponseHotelStronaobrazuImages> images) {
    this.images = images;
    return this;
  }

  public ResponseHotelStronaobrazu addImagesItem(ResponseHotelStronaobrazuImages imagesItem) {
    if (this.images == null) {
      this.images = new ArrayList<>();
    }
    this.images.add(imagesItem);
    return this;
  }

  /**
   * Get images
   * @return images
   **/
  @Schema(description = "")
      @Valid
    public List<ResponseHotelStronaobrazuImages> getImages() {
    return images;
  }

  public void setImages(List<ResponseHotelStronaobrazuImages> images) {
    this.images = images;
  }


  @Override
  public boolean equals(java.lang.Object o) {
    if (this == o) {
      return true;
    }
    if (o == null || getClass() != o.getClass()) {
      return false;
    }
    ResponseHotelStronaobrazu responseHotelStronaobrazu = (ResponseHotelStronaobrazu) o;
    return Objects.equals(this.title, responseHotelStronaobrazu.title) &&
        Objects.equals(this.dimensions, responseHotelStronaobrazu.dimensions) &&
        Objects.equals(this.price, responseHotelStronaobrazu.price) &&
        Objects.equals(this.category, responseHotelStronaobrazu.category) &&
        Objects.equals(this.medium, responseHotelStronaobrazu.medium) &&
        Objects.equals(this.style, responseHotelStronaobrazu.style) &&
        Objects.equals(this.date, responseHotelStronaobrazu.date) &&
        Objects.equals(this.description, responseHotelStronaobrazu.description) &&
        Objects.equals(this.artistId, responseHotelStronaobrazu.artistId) &&
        Objects.equals(this.artistNick, responseHotelStronaobrazu.artistNick) &&
        Objects.equals(this.artistAvatarUrl, responseHotelStronaobrazu.artistAvatarUrl) &&
        Objects.equals(this.images, responseHotelStronaobrazu.images);
  }

  @Override
  public int hashCode() {
    return Objects.hash(title, dimensions, price, category, medium, style, date, description, artistId, artistNick, artistAvatarUrl, images);
  }

  @Override
  public String toString() {
    StringBuilder sb = new StringBuilder();
    sb.append("class ResponseHotelStronaobrazu {\n");
    
    sb.append("    title: ").append(toIndentedString(title)).append("\n");
    sb.append("    dimensions: ").append(toIndentedString(dimensions)).append("\n");
    sb.append("    price: ").append(toIndentedString(price)).append("\n");
    sb.append("    category: ").append(toIndentedString(category)).append("\n");
    sb.append("    medium: ").append(toIndentedString(medium)).append("\n");
    sb.append("    style: ").append(toIndentedString(style)).append("\n");
    sb.append("    date: ").append(toIndentedString(date)).append("\n");
    sb.append("    description: ").append(toIndentedString(description)).append("\n");
    sb.append("    artistId: ").append(toIndentedString(artistId)).append("\n");
    sb.append("    artistNick: ").append(toIndentedString(artistNick)).append("\n");
    sb.append("    artistAvatarUrl: ").append(toIndentedString(artistAvatarUrl)).append("\n");
    sb.append("    images: ").append(toIndentedString(images)).append("\n");
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
